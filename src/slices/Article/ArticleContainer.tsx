import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch, RootState } from '../../store';
import { selectOptimisticArticle } from '../common.selectors';
import { ArticleWithComments } from '../entities/types/articleWithComments';
import { getArticleData } from './article.thunks';
import { ArticlePage } from './components/ArticlePage';

const articleSelector = (slug: string) =>
  createSelector(
    (state: RootState) => state.entities,
    (state: RootState) => state.optimistic,
    (entities, optimistic) =>
      selectOptimisticArticle(slug, entities, optimistic)
  );

export const ArticleContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const article = useSelector<RootState, ArticleWithComments>(
    articleSelector(slug)
  );

  useEffect(() => {
    dispatch(getArticleData(slug));
  }, [slug, dispatch]);
  console.log(article);
  return article.slug ? (
    <ArticlePage article={article} comments={article.comments} />
  ) : null;
};
