import { combineReducers } from 'redux';
import { createEntityReducer } from '../../utils/reducer-utils/createEnitySlice';
import { Dictionary } from '../../utils/types/Dictionary';
import { ArticleWithComments } from './types/articleWithComments';
import { Author } from './types/author';
import { Comment } from './types/comment';
import { Tag } from './types/tag';
import { tagsReducer } from './tags.reducer';

export type NormalizedEntity = Dictionary<any>;

export type NormalizedEntities = 'articles' | 'authors' | 'comments';

export type EntitiesNormalizedState = {
  [key in NormalizedEntities]: NormalizedEntity;
} & {
  tags: Tag[];
};

export type Entities = keyof EntitiesNormalizedState;

export type EntitiesDenormalizedStateMapping = {
  articles: ArticleWithComments;
  comments: Comment;
  tags: Tag[];
  authors: Author;
};

const articlesReducer = createEntityReducer('articles');
const authorsReducer = createEntityReducer('authors');
const commentsReducer = createEntityReducer('comments');

export const entitesReducer = combineReducers({
  articles: articlesReducer,
  tags: tagsReducer,
  authors: authorsReducer,
  comments: commentsReducer
});
