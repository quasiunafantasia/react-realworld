import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    }
  }
});
