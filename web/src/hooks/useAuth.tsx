import React, { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "./useLocalStorage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContext {
  user: null | User;
  login(email: string, password: string): void;
  logout(): void;
} 

const AuthContext = createContext<undefined | AuthContext>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<null | User>('user', null);

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setUser({ id: 1, name: 'fake-user', email });
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  }

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
