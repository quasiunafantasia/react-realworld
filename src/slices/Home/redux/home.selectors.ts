import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { selectArticleById } from '../../entities/articles.reducer';
import {
  OptimisticState,
  selectOptimistic
} from '../../optimistic/optimistic.slice';
import { getSelectedArticles } from './home.slice';

export const getSelectedArticlesFromRoot = (state: RootState) =>
  getSelectedArticles(state);

export const selectOptimisticArticle = (
  id: string,
  entities: any,
  optimistic: OptimisticState
) => {
  return {
    ...selectArticleById(entities, id),
    ...selectOptimistic(optimistic, 'articles', id)
  };
};

export const selectVisibleArticles = createSelector(
  getSelectedArticlesFromRoot,
  (state: RootState) => state.entities,
  (state: RootState) => state.optimistic,
  (ids, entities, optimistic) => {
    return ids.map(id => {
      return selectOptimisticArticle(id, entities, optimistic);
    });
  }
);
