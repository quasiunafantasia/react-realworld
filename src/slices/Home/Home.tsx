import { FC, useContext } from 'react';
import * as React from 'react';
import { Article } from '../entities/types/article';
import { Header } from './components/Header';
import { FeedSelector } from './components/FeedSelector';
import { ArticlePreview } from './components/ArticlePreview';
import { TagList } from './components/TagList';
import { Pagination } from './components/Pagination';
import { context } from './HomeContext';

const calculatePages = (items: number, pageSize: number) =>
  Math.ceil(items / pageSize);

export const Home: FC<{ articles: Article[] }> = ({ articles }) => {
  const {
    tags,
    selectTag,
    selectedPage,
    selectPage,
    feeds,
    selectedFeed,
    selectFeed,
    total
  } = useContext(context);
  const noop = () => {};
  return (
    <div className="home-page">
      <Header />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedSelector
              feeds={feeds || []}
              selectedFeed={selectedFeed}
              selectFeed={selectFeed || noop}
            />

            {articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}

            <Pagination
              activePage={selectedPage || 1}
              selectPage={selectPage || noop}
              totalPages={calculatePages(total || 0, 20)}
            />
          </div>

          <div className="col-md-3">
            <TagList tags={tags || []} selectTag={selectTag || noop} />
          </div>
        </div>
      </div>
    </div>
  );
};
