import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
});

export const csrf = () => api.get('/sanctum/csrf-cookie');

export const register = ({ name, email, password }: { name: string; email: string; password: string }) => api.post('register', { name, email, password });

export const login = (email: string, password: string) => api.post('login', { email, password });

export const logout = () => api.post('/logout');

export const getUser = () => api.get<{ id: number; name: string; email: string }>(
  '/api/user',
  { headers: { 'Accept': 'application/json' } },
);
