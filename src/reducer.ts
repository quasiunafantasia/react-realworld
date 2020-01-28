import { combineReducers } from 'redux';
import { articlesSlice } from './entities/articles/articles.slice';
import { tagsSlice } from './entities/tags/tags.slice';

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  tags: tagsSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
