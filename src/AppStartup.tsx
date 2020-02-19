import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from './core/api/api-client';
import { loadToken, storeToken } from './core/tokenStorage';
import { authSlice } from './slices/Auth/authSlice';
import { AppDispatch } from './store';

export const AppStartup: FC = ({ children }) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [isStarted, setIsStarted] = useState(false);

  const onStartup = useCallback(() => {
    const token = loadToken();
    if (token) {
      apiClient.setToken(token);
      dispatch(authSlice.actions.loginByToken()).catch(() => storeToken(null));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isStarted) {
      return;
    }
    onStartup();
    setIsStarted(true);
  }, [onStartup, setIsStarted, isStarted]);

  return <>{isStarted ? children : null}</>;
};
