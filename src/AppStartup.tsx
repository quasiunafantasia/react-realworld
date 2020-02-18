import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from './core/api/api-client';
import { loadToken } from './core/tokenStorage';
import { authSlice } from './slices/Auth/authSlice';
import { AppDispatch } from './store';

export const AppStartup: FC = ({children}) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        apiClient.setToken(loadToken());
        dispatch(authSlice.actions.loginByToken());
    }, [dispatch]);

    return <>{children}</>
}
