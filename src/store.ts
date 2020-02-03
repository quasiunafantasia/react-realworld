import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { authSlice } from './auth/auth.slice';
import { articlesSlice } from './entities/articles/articles.slice';
import { tagsSlice } from './entities/favourite-tags/tags.slice';
import { homeSlice } from './pages/Home/redux/home.slice';
import { loadState, storeState } from './stateStorage';
import throttle from 'lodash/throttle';

export type RootState = ReturnType<typeof rootReducer>;
//todo fix type
export type AppThunk = ThunkAction<
  Promise<any>,
  RootState,
  undefined,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  tags: tagsSlice.reducer,
  home: homeSlice.reducer,
  auth: authSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState()
});

store.subscribe(
  throttle(() => {
    storeState(store.getState());
  })
);
