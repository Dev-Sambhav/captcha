import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
  // for preventing user information if user already login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(user) => {
      setIsAuthReady(true);
      setCurrentUser(user);
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAuthReady }}>{children}</AuthContext.Provider>
  );
};
