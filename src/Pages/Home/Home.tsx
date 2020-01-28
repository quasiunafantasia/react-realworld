import * as React from 'react';
import { Article } from '../../entities/articles/article.interface';
import { Header } from './components/Header';
import { FeedSelector } from './components/FeedSelector';
import { ArticlePreview } from './components/ArticlePreview';
import { TagList } from './components/TagList';

export const Home = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="home-page">
      <Header />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedSelector />

            {articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}
          </div>

          <div className="col-md-3">
            <TagList />
          </div>
        </div>
      </div>
    </div>
  );
};
