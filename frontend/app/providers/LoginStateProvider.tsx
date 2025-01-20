import { useContext, useEffect } from "react";
import { PropsWithChildren, useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase_config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";


export interface ILoginStateContext {
  loggedInUser: User | undefined;
  createUser: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const LoginStateContext = createContext<ILoginStateContext>({
  loggedInUser: undefined,
  createUser: () => {},
  login: () => {},
  logout: () => {},
});

export default function LoginStateProvider({ children }: PropsWithChildren<object>) {

  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

  const logout = () => {
    signOut(auth);
    setLoggedInUser(undefined);
  }

  const createUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
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

  const login = (email: string, password: string) => {
    console.log("logging in with email", email, "and password", password);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoggedInUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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
