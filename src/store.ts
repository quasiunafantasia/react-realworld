import { configureStore } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { articlesSlice } from './entities/articles/articles.slice';
import { tagsSlice } from './entities/favourite-tags/tags.slice';
import { homeSlice } from './pages/Home/redux/home.slice';

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  tags: tagsSlice.reducer,
  home: homeSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
