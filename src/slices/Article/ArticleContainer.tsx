import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiClient } from '../../core/api/api-client';
import { Article } from '../../core/entities/articles/article.interface';
import { ArticlePage } from './components/ArticlePage';

export const ArticleContainer = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article>();
  const [comments, setComments] = useState<Article>();
  useEffect(() => {
    apiClient
      .get(`/api/articles/${slug}`)
      .then(res => setArticle(res.data.article));
    apiClient
      .get(`/api/articles/${slug}/comments`)
      .then(res => setComments(res.data.comments));
  }, [slug]);

  return <ArticlePage article={article} comments={comments} />;
};
