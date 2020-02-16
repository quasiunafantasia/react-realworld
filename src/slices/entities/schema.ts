import { schema } from 'normalizr';
import { NormalizedEntities } from './entities.reducer';

export const authorSchema = new schema.Entity(
  'authors',
  {},
  { idAttribute: 'username' }
);

export const commentSchema = new schema.Entity('comments', {
  commenter: authorSchema
});

export const articleSchema = new schema.Entity(
  'articles',
  {
    author: authorSchema,
    comments: [commentSchema]
  },
  {
    idAttribute: 'slug'
  }
);

export const shemaMapping: {
  [key in NormalizedEntities]: typeof articleSchema;
} = {
  articles: articleSchema,
  authors: authorSchema,
  comments: commentSchema
};
