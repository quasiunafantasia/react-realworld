import {
  createEntityReducer,
  Entity
} from '../../../utils/reducer-utils/createEnitySlice';
import { Article } from './article.interface';

type State = Entity<Article>;

const initialState: State = {
  ids: [] as string[],
  byId: {}
};

export const articlesSlice = createEntityReducer<Article>(
  'articles',
  initialState,
  'slug'
);
