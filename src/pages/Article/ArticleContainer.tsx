import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiClient } from '../../api/api-client';
import { Article } from '../../entities/articles/article.interface';
import { ArticleComments } from './components/ArticleComments';
import { ArticleFooter } from './components/ArticleFooter';
import { ArticleHeader } from './components/ArticleHeader';

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

  return (
    <div className="article-page">
      <ArticleHeader article={article || { author: {} }} />
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {/* todo as html */}
            {article && article.body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleFooter />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <ArticleComments
              comments={comments || ([] as any)}
              showSubmit={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
