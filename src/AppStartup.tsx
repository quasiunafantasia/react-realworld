import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from './core/api/api-client';
import { loadToken, storeToken } from './core/tokenStorage';
import { authSlice } from './slices/Auth/authSlice';
import { AppDispatch } from './store';

export const AppStartup: FC = ({ children }) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = loadToken();
    if (token) {
      apiClient.setToken(token);
      dispatch(authSlice.actions.loginByToken()).catch(() => storeToken(null));
    }
  }, [dispatch]);

  return <>{children}</>;
};
