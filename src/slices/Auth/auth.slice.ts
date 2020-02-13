import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByToken, register } from './auth.actions';

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

const _authSlice = createSlice({
  name: 'auth',
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    }
  }
});

export const authSlice = {
  ..._authSlice,
  actions: {
    ..._authSlice.actions,
    loginByToken,
    register
  }
};
