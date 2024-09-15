import React, { createContext, useContext } from "react";
import { api, csrf } from "@/lib/api";
import { useLocalStorage } from "./useLocalStorage";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthContext {
  user: null | User;
  isAuthenticated: boolean;
  register({ name, email, password }: { name: string; email: string; password: string }): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
} 

const AuthContext = createContext<undefined | AuthContext>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<null | User>('user', null);

  const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    await csrf();

    await api.post(
      'register',
      { name, email, password },
      { headers: { 'Content-Type': 'application/json' },
    });
  }

  const login = async (email: string, password: string) => {
    await csrf();

    const { data: { user, token } } = await api.post<{ user: { id: number; name: string; email: string; }; token: string }>(
      'login',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } },
    );

    setUser({ id: user.id, name: user.name, email: user.email, token });
  };

  const logout = async () => {
    await csrf();

    await api.post(
      'logout',
      [],
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` } },
    );

    setUser(null);
  }

  const isAuthenticated = user !== null;

  const value = { user, isAuthenticated, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
