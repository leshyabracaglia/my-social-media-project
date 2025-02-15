import { useContext } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
import { backendFetch } from "../hooks/useBackend";

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
  updateUser: (displayName: string, photoURL: string) => void;
}

export const LoginStateContext = createContext<ILoginStateContext>({
  loggedInUser: undefined,
  createUser: () => null,
  login: () => Promise.resolve(null),
  logout: () => {},
  updateUser: () => {},
});


export default function LoginStateProvider({ children }: PropsWithChildren<object>) {

  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

  const logout = () => {
    signOut(auth);
    setLoggedInUser(undefined);
  }

  const backendCreateUser = (user: User) => {
    backendFetch(`/api/create_user`, {
      method: "POST",
      body: JSON.stringify({
        firebase_uid: user.uid,
        email: user.email,
        time_created: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } 

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        backendCreateUser(user);
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

  const updateUser = (displayName: string, photoURL: string) => {
    if (!loggedInUser) return;
    updateProfile(loggedInUser, {
      displayName,
      photoURL,
    })
    backendFetch(`/api/update_user`, {
      method: "POST",
      body: JSON.stringify({
        firebase_uid: loggedInUser?.uid,
        username: displayName,
        profile_image_url: photoURL,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <LoginStateContext.Provider
      value={{
        loggedInUser,
        createUser,
        login,
        logout,
        updateUser,
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
