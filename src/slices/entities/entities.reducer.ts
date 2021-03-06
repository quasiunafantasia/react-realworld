import { combineReducers } from 'redux';
import { createEntityReducer } from '../../utils/reducerUtils/createEnitySlice';
import { Dictionary } from '../../utils/types/Dictionary';
import { ArticleWithComments } from './types/articleWithComments';
import { Author } from './types/author';
import { Comment } from './types/comment';
import { Tag } from './types/tag';
import { tagsReducer } from './tags.reducer';

export type NormalizedEntity = Dictionary<any>;

export type NormalizedEntities = 'articles' | 'authors' | 'comments';

export type EntitiesState = {
  [key in NormalizedEntities]: NormalizedEntity;
} & {
  tags: Tag[];
};

export type NormalizedEntitiesState = Pick<EntitiesState, NormalizedEntities>;

export type Entities = keyof EntitiesState;

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
