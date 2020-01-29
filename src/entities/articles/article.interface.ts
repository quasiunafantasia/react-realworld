import { Author } from '../author.interface';
import { schema } from 'normalizr';

export const articleSchema = new schema.Entity<Article>(
  'articles',
  {},
  {
    idAttribute: 'slug'
  }
);

export const articlesSchema = new schema.Array(articleSchema);

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
