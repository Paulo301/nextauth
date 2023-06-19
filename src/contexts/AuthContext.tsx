import { api } from "@/services/api";
import { createContext, ReactNode } from "react";

type SigInCredentials = {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SigInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SigInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}