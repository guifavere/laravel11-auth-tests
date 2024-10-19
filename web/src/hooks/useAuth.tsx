import React, { createContext, useContext } from "react";
import { api } from "@/lib/api";
import { useLocalStorage } from "./useLocalStorage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContext {
  user: null | User;
  isAuthenticated: boolean;
  logout(): Promise<void>;
} 

const AuthContext = createContext<undefined | AuthContext>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<null | User>('user', null);

  const logout = async () => {
    await api.post('logout');

    setUser(null);
  }

  const isAuthenticated = user !== null;

  const value = { user, isAuthenticated, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
