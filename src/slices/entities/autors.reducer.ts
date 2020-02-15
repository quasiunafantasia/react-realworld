import { Author } from './author.interface';
import { createEntityReducer } from '../../utils/reducer-utils/createEnitySlice';
import { Dictionary } from '../../utils/types/Dictionary';

export const authorsReducer = createEntityReducer<Author>(
  'authors',
  {} as Dictionary<Author>
);
