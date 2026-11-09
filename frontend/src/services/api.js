
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// Adiciona automaticamente o token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@daily-diet:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
