import * as React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../../core/entities/articles/article.interface';

export const ArticlePreview = ({ article }: { article: Article }) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={article.author.image} />
        </a>
        <div className="info">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="author">
            {article.author.username}
          </a>
          <span className="date">{article.createdAt}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};
