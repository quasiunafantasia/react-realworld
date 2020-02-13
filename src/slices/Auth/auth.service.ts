import { apiClient } from '../../core/api/api-client';
import { User } from './auth.slice';

export const login = (email: string, password: string) =>
  apiClient.post('/api/users/login', {
    user: {
      email,
      password
    }
  });

export const register = (email: string, password: string, username: string) =>
  apiClient.post('/api/users', {
    user: {
      username,
      email,
      password
    }
  });

export const getCurrentUser = async (token: string) => {
  const res = await apiClient.get('/api/user', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return res.data.user;
};

export const updateUser = (data: Partial<User>) =>
  apiClient.put('/api/user', {
    user: data
  });
