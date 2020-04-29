import React, { FC } from 'react';
import { Article } from '../../entities/types/article';

export const ArticleFooter: FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="article-meta">
      <a href="profile.html">
        <img src={article?.author.image} alt="" />
      </a>
      <div className="info">
        {/*  todo link*/}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="" className="author">
          {article?.author.username}
        </a>
        <span className="date">{article?.createdAt}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round" />
        &nbsp; Follow {article?.author.username}{' '}
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
