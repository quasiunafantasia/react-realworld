import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { authSlice } from './slices/Auth/auth.slice';
import { articlesSlice } from './core/entities/articles/articles.slice';
import { tagsSlice } from './core/entities/favourite-tags/tags.slice';
import { storeTokenMiddleware } from './slices/Auth/storeToken.middleware';
import { homeSlice } from './slices/Home/redux/home.slice';
import { loadState, storeState } from './core/stateStorage';
import throttle from 'lodash/throttle';

export type RootState = ReturnType<typeof rootReducer>;
//todo fix type
export type AppThunk = ThunkAction<
  Promise<any>,
  RootState,
  undefined,
  Action<string>
>;

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  tags: tagsSlice.reducer,
  home: homeSlice.reducer,
  auth: authSlice.reducer
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
