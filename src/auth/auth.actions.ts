import { AppThunk } from '../store';
import * as authService from './auth.service';
import { authSlice } from './auth.slice';

export const login = (
  email: string,
  password: string
): AppThunk => dispatch => {
  return authService
    .login(email, password)
    .then(res => {
      dispatch(authSlice.actions.setUser(res.data.user));
    })
    .catch(err => {
      throw err.response.data.errors;
    });
};

export const register = (
  email: string,
  password: string,
  username: string
): AppThunk => dispatch => {
  return authService
    .register(email, password, username)
    .then(res => {
      console.log(res.data.user);
      dispatch(authSlice.actions.setUser(res.data.user));
    })
    .catch(err => {
      throw err.response.data.errors;
    });
};
