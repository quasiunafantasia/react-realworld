import { Middleware, MiddlewareAPI } from 'redux';
import { storeToken } from '../../core/tokenStorage';
import { AppDispatch, RootState } from '../../store';

export const storeTokenMiddleware: Middleware = (
  api: MiddlewareAPI<AppDispatch, RootState>
) => (next: AppDispatch) => action => {
  const state = api.getState();
  const lastToken = state?.auth?.token;
  const nextResult = next(action);
  const nextState = api.getState();
  // nextState.
  const nextToken = nextState?.auth?.token;
  if (nextToken !== lastToken) {
    storeToken(nextToken);
  }

  return nextResult;
};
