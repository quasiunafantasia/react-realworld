import { normalize } from 'normalizr';
import { AppDispatch, AppThunk } from '../../store';
import { addEntities } from '../entities/addEntities.action';
import { EntitiesState } from '../entities/entities.reducer';
import { authorSchema } from '../entities/schema';
import { Author } from '../entities/types/author';
import { getCurrentUser } from './authService';
import * as authService from './authService';
import { authSlice } from './authSlice';

type UserResponse = Author & {
  token: string;
};

const onUserResponse = (res: UserResponse, dispatch: AppDispatch) => {
  const { token, ...user } = res;
  const normalized = normalize<any, EntitiesState>(user, authorSchema);
  dispatch(
    addEntities({
      entities: normalized.entities
    })
  );
  dispatch(authSlice.actions.setCurrentAuthor(normalized.result));
  dispatch(authSlice.actions.setToken(token));
};

export const login = (email: string, password: string): AppThunk => (
  dispatch: AppDispatch
) => {
  return authService
    .login(email, password)
    .then(res => {
      onUserResponse(res, dispatch);
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
      onUserResponse(res, dispatch);
    })
    .catch(err => {
      throw err.response.data.errors;
    });
};

export const loginByToken: () => AppThunk = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  const user = await getCurrentUser();
  onUserResponse(user, dispatch);
};
