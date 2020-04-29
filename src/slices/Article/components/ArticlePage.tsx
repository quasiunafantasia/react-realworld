import React, { FC } from 'react';
import { Article } from '../../entities/types/article';
import { Comment } from '../../entities/types/comment';
import { ArticleComments } from './comments/ArticleComments';
import { ArticleFooter } from './ArticleFooter';
import { ArticleHeader } from './ArticleHeader';

export const ArticlePage: FC<{ article: Article; comments: Comment[] }> = ({
  article,
  comments
}) => {
  return (
    <div className="article-page">
      <ArticleHeader article={article} />
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {/* todo as html */}
            {article && article.body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleFooter article={article} />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <ArticleComments comments={comments || ([] as any)} />
          </div>
        </div>
      </div>
    </div>
  );
};
