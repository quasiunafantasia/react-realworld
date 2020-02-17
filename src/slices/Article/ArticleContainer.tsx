import { useEffect } from 'react';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../store';
import { useOptimisticEntitySelector } from '../entities/entities.selectors';
import { getArticleData } from './article.thunks';
import { ArticlePage } from './components/ArticlePage';

export const ArticleContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const article = useOptimisticEntitySelector('articles', slug);

  useEffect(() => {
    dispatch(getArticleData(slug));
  }, [slug, dispatch]);
  console.log(article);
  return article.slug ? (
    <ArticlePage article={article} comments={article.comments} />
  ) : null;
};
