import React from 'react';

//todo fix type
export const ArticleHeader = ({ article }: any) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <a href="">
            <img src={article.author.image} />
          </a>
          <div className="info">
            <a href="" className="author">
              {article.author.username}
            </a>
            <span className="date">{article.createdAt}</span>
          </div>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round" />
            &nbsp; Follow {article.author.username}
            <span className="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; Favorite Post{' '}
            <span className="counter">({article.favoritesCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
