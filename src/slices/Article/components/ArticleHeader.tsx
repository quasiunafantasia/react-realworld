import React, { useContext } from 'react';
import { articleContext } from '../ArticleContext';

//todo fix type
export const ArticleHeader = () => {
  const { article } = useContext(articleContext);

  return (
    <div className="banner">
      <div className="container">
        <h1>{article?.title}</h1>

        <div className="article-meta">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="">
            <img src={article?.author?.image} alt="" />
          </a>
          <div className="info">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="author">
              {article?.author?.username}
            </a>
            <span className="date">{article?.createdAt}</span>
          </div>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            &nbsp; Follow {article?.author.username}
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-skm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; Favorite Post{' '}
            <span className="counter">({article?.favoritesCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
