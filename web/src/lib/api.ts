import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const csrf = () => api.get('/sanctum/csrf-cookie');
