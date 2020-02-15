import { denormalize } from 'normalizr';
import { articleSchema } from './schema';
import { createEntityReducer } from '../../utils/reducer-utils/createEnitySlice';
import { Article } from './article.interface';
import { Dictionary } from '../../utils/types/Dictionary';

export const articlesReducer = createEntityReducer<Article>(
  'articles',
  {} as Dictionary<Article>
);

//todo fix type?
export const selectArticleById = (entities: any, id: string) =>
  denormalize(id, articleSchema, entities);
