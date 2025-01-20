import { useContext } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

export const LOGIN_ERROR_CODES = {
  INVALID_CREDENTIAL: "auth/invalid-credential",
  INVALID_EMAIL: "auth/invalid-email",
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
}

export type ILoginErrorCode = keyof typeof LOGIN_ERROR_CODES;

export interface ILoginStateContext {
  loggedInUser: User | undefined;
  createUser: (email: string, password: string) => void;
  login: (email: string, password: string) => Promise<ILoginErrorCode | null>;
  logout: () => void;
}

export const LoginStateContext = createContext<ILoginStateContext>({
  loggedInUser: undefined,
  createUser: () => null,
  login: () => Promise.resolve(null),
  logout: () => {},
});

export default function LoginStateProvider({ children }: PropsWithChildren<object>) {

  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

  const logout = () => {
    signOut(auth);
    setLoggedInUser(undefined);
  }

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      const user = userCredential.user;
      setLoggedInUser(user);
      return null;
    } catch (error: any) {
      return error.code as ILoginErrorCode;
    }
  };

  return (
    <LoginStateContext.Provider
      value={{
        loggedInUser,
        createUser,
        login,
        logout,
      }}
    >
      {children}
    </LoginStateContext.Provider>
  );
}

export function useLoginStateContext() {
  const context = useContext(LoginStateContext);

  if (!context) {
    throw new Error(
      'useLoginStateContext must be used within a LoginStateProvider',
    );
  }

  return context;
}
