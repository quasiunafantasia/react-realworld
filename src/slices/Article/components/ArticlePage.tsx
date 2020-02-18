import React from 'react';
import { articleContext } from '../ArticleContext';
import { ArticleComments } from './ArticleComments';
import { ArticleFooter } from './ArticleFooter';
import { ArticleHeader } from './ArticleHeader';

//todo add type
// @ts-ignore
export const ArticlePage = ({ article, comments }) => {
  return (
    <articleContext.Provider
      value={{
        article: article || { author: {} },
        comments
      }}
    >
      <div className="article-page">
        <ArticleHeader />
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
              />
            </div>
          </div>
        </div>
      </div>
    </articleContext.Provider>
  );
};
