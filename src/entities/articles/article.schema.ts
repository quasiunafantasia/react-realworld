import { schema } from 'normalizr';
import { Article } from './article.interface';

export const articleSchema = new schema.Entity<Article>('article');
