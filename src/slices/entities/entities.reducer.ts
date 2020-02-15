import { combineReducers } from 'redux';
import { articlesReducer } from './articles.reducer';
import { authorsReducer } from './autors.reducer';
import { tagsReducer } from './tags.reducer';

export const entitesReducer = combineReducers({
  articles: articlesReducer,
  tags: tagsReducer,
  authors: authorsReducer
});
