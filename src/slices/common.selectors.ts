import { selectArticleBySlug } from './entities/entities.selectors';
import { ArticleWithComments } from './entities/types/articleWithComments';
import {
  OptimisticState,
  selectOptimistic
} from './optimistic/optimistic.slice';

export const selectOptimisticArticle = (
  id: string,
  entities: any,
  optimistic: OptimisticState
) => {
  return {
    ...selectArticleBySlug(entities, id),
    ...selectOptimistic(optimistic, 'articles', id)
  } as ArticleWithComments;
};
