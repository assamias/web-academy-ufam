"use client";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

type UserEmail = string | null;

interface IAuthContext {
  userEmail: UserEmail;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState<UserEmail>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserEmail(storedUser);
    }
  }, []);

  const redirectToHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const login = useCallback((email: string) => {
    if (typeof window !== "undefined") {
      setUserEmail(email);
      localStorage.setItem("user", email);
      redirectToHome();
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      setUserEmail(null);
      localStorage.removeItem("user");
    }
  }, []);

  const value = useMemo(
    () => ({
      userEmail,
      login,
      logout,
    }),
    [userEmail, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
