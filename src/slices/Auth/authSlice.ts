import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByToken, register } from './auth.thunks';

type AuthState = {
  currentAuthor?: string;
  token?: string;
};

const _authSlice = createSlice({
  name: 'auth',
  initialState: {} as AuthState,
  reducers: {
    setCurrentAuthor: (state, action: PayloadAction<string>) => {
      state.currentAuthor = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
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
