import { denormalize } from 'normalizr';
import {
  EntitiesDenormalizedStateMapping,
  EntitiesNormalizedState,
  NormalizedEntities
} from './entities.reducer';
import { shemaMapping } from './schema';

const createEntityByIdSelector = <K extends NormalizedEntities>(entity: K) => (
  entities: EntitiesNormalizedState,
  id: string
) =>
  denormalize(
    id,
    shemaMapping[entity],
    entities
  ) as EntitiesDenormalizedStateMapping[K];

export const selectArticleBySlug = createEntityByIdSelector('articles');
export const selectCommentById = createEntityByIdSelector('comments');
export const selectAuthorById = createEntityByIdSelector('authors');
