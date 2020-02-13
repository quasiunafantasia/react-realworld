import { Maybe } from '../utils/types/Maybe';

const TOKEN_KEY = '__TOKEN__';

export const storeToken = (token: Maybe<string>) => {
  localStorage.setItem(TOKEN_KEY, token || '');
};

export const loadToken = (): Maybe<string> => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    return undefined;
  }
};
