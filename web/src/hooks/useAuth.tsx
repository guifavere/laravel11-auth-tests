import React, { createContext, useContext } from "react";
import { csrf, getUser, login as handleLogin, logout as handleLogout } from "@/lib/api";
import { useLocalStorage } from "./useLocalStorage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContext {
  user: null | User;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
} 

const AuthContext = createContext<undefined | AuthContext>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<null | User>('user', null);

  const login = async (email: string, password: string) => {
    await csrf();

    await handleLogin(email, password);

    const { data } = await getUser();

    setUser(data);
  }

  const logout = async () => {
    await handleLogout();

    setUser(null);
  }

  const isAuthenticated = user !== null;

  const value = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
