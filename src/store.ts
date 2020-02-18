import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { authSlice } from './slices/Auth/authSlice';
import { storeTokenMiddleware } from './slices/Auth/storeTokenMiddleware';
import { entitesReducer } from './slices/entities/entities.reducer';
import { homeSlice } from './slices/Home/redux/home.slice';
import { loadState, storeState } from './core/stateStorage';
import throttle from 'lodash/throttle';
import { optimisticReducer } from './slices/optimistic/optimistic.reducer';

export type RootState = ReturnType<typeof rootReducer>;
//todo fix type
export type AppThunk = ThunkAction<
  Promise<any>,
  RootState,
  undefined,
  Action<string>
>;

export const rootReducer = combineReducers({
  home: homeSlice.reducer,
  auth: authSlice.reducer,
  entities: entitesReducer,
  optimistic: optimisticReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: [
    ...getDefaultMiddleware<RootState>(),
    storeTokenMiddleware
  ] as ThunkMiddleware<RootState>[] //todo ? figure out why type chain gets broken
});

export type AppDispatch = typeof store.dispatch;

store.subscribe(
  throttle(() => {
    storeState(store.getState());
  })
);
