import React, { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from "@/lib/api";
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
  login(email: string, password: string): void;
  logout(): void;
} 

const AuthContext = createContext<undefined | AuthContext>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<null | User>('user', null);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setUser({ id: 1, name: 'fake-user', email, token: '123' });
    navigate('/dashboard');
  };

  const logout = async () => {
    await api.post(
      'logout',
      [],
      { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` } },
    );

    setUser(null);
    navigate('/', { replace: true });
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
