import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
