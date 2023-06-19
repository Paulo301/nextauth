import { api } from "@/services/api";
import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SigInCredentials = {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SigInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user.email;

  async function signIn({ email, password }: SigInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //30 days,
        path: '/'
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days,
        path: '/'
      });

      setUser({
        email,
        permissions,
        roles,
      });

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}