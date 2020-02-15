import { schema } from 'normalizr';
import { Article } from './article.interface';
import { Author } from './author.interface';
import { Comment } from './comment.interface';

export const authorSchema = new schema.Entity<Author>(
  'authors',
  {},
  { idAttribute: 'username' }
);

export const commentSchema = new schema.Entity<Comment>('comments', {
  commenter: authorSchema
});

export const articleSchema = new schema.Entity<Article>(
  'articles',
  {
    author: authorSchema,
    comments: [commentSchema]
  },
  {
    idAttribute: 'slug'
  }
);
