import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User as FirebaseAuthUser,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

type UserType = {
  email: string;
};

type SigningProps = {
  email: string;
  password: string;
};

type AuthContextType = {
  signUp: (credentials: SigningProps) => Promise<void>;
  logIn: (credentials: SigningProps) => Promise<void>;
  logOut: () => Promise<void>;
  user: UserType | null;
};

const AuthContext = createContext<AuthContextType>({
  signUp: () => Promise.resolve(),
  logIn: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
  user: null,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);

  function signUp({ email, password }: SigningProps) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const newUser: UserType = {
          email: userCredential.user?.email || "",
        };

        setDoc(doc(db, "users", email), {
          savedShows: [],
        });

        setUser(newUser);
      })
      .catch((error) => {
        console.log("Sign up error:", error);
      });
  }

  function logIn({ email, password }: SigningProps) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const newUser: UserType = {
          email: userCredential.user?.email || "",
        };

        setUser(newUser);
      })
      .catch((error) => {
        console.log("Login error:", error);
      });
  }

  function handleLogOut() {
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser: FirebaseAuthUser | null) => {
        if (currentUser) {
          const newUser: UserType = {
            email: currentUser.email || "",
          };
          setUser(newUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue: AuthContextType = {
    signUp,
    logIn,
    logOut: handleLogOut,
    user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext);
}
