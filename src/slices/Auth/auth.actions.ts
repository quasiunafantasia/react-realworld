import { storeToken } from '../../core/tokenStorage';
import { AppDispatch, AppThunk } from '../../store';
import { getCurrentUser } from './auth.service';
import * as authService from './auth.service';
import { authSlice } from './auth.slice';

export const login = (email: string, password: string): AppThunk => (
  dispatch: AppDispatch
) => {
  return authService
    .login(email, password)
    .then(res => {
      dispatch(authSlice.actions.setUser(res.data.user));
    })
    .catch(err => {
      throw err.response.data.errors;
    });
};

export const register: (
  email: string,
  password: string,
  username: string
) => AppThunk = (
  email: string,
  password: string,
  username: string
): AppThunk => (dispatch: AppDispatch) => {
  return authService
    .register(email, password, username)
    .then(res => {
      storeToken(res.data.user.token);
      //todo preformat
      dispatch(authSlice.actions.setUser(res.data.user));
    })
    .catch(err => {
      throw err.response.data.errors;
    });
};

export const loginByToken: (token: string) => AppThunk = (
  token: string
): AppThunk => async (dispatch: AppDispatch) => {
  const user = await getCurrentUser(token);
  dispatch(authSlice.actions.setUser(user));
};
