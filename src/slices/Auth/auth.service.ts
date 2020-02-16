import { apiClient } from '../../core/api/api-client';
import { Author } from '../entities/types/author';

export const login = (email: string, password: string) =>
  apiClient
    .post('/api/users/login', {
      user: {
        email,
        password
      }
    })
    .then(res => res.data.user);

export const register = (email: string, password: string, username: string) =>
  apiClient
    .post('/api/users', {
      user: {
        username,
        email,
        password
      }
    })
    .then(res => res.data.user);

export const getCurrentUser = async () => {
  const res = await apiClient.get('/api/user');
  return res.data.user;
};

export const updateUser = (data: Partial<Author>) =>
  apiClient
    .put('/api/user', {
      user: data
    })
    .then(res => res.data.user);
