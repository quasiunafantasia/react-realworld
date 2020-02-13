import React, { useContext } from 'react';
import { articleContext } from '../ArticleContext';

export const ArticleFooter = () => {
  const { article } = useContext(articleContext);

  return (
    <div className="article-meta">
      <a href="profile.html">
        <img src={article?.author.image} />
      </a>
      <div className="info">
        {/*  todo link*/}
        <a href="" className="author">
          {article?.author.username}
        </a>
        <span className="date">{article?.createdAt}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        {/*  todo followers count*/}
        &nbsp; Follow {article?.author.username}{' '}
        <span className="counter">(10)</span>
      </button>
      &nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{' '}
        <span className="counter">({article?.favoritesCount})</span>
      </button>
    </div>
  );
};
