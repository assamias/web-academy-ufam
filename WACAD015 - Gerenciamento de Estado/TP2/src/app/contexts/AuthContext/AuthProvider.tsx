"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  email: string;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  email: "",
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setEmail(storedUser);
    }
  }, []);

  const login = (email: string) => {
    if (email) setEmail(email);
    localStorage.setItem("user", email);
    router.push("/");
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("user");
  };

  const values = {
    email: email || "",
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
