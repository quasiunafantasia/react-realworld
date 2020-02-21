import { FC, useContext } from 'react';
import * as React from 'react';
import { useIsLoggedIn } from '../Auth/currnetUserProvider';
import { Article } from '../entities/types/article';
import { Header } from './components/Header';
import { FeedSelector } from './components/FeedSelector';
import { ArticlePreview } from './components/ArticlePreview';
import { TagList } from './components/TagList';
import { Pagination } from './components/Pagination';
import { context } from './HomeContext';

export const Home: FC<{ articles: Article[] }> = ({ articles }) => {
  const {
    tags,
    selectTag,
    selectedPage,
    selectPage,
    selectedFeed,
    selectFeed,
    selectedTag,
    total
  } = useContext(context);
  const isLoggedIn = useIsLoggedIn();
  const noop = () => {};
  return (
    <div className="home-page">
      <Header />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedSelector
              selectedFeed={selectedFeed}
              selectFeed={selectFeed || noop}
              isLoggedIn={isLoggedIn}
              selectedTag={selectedTag}
            />

            {articles.map(article => (
              <ArticlePreview article={article} key={article.slug} />
            ))}

            <Pagination
              total={total || 0}
              perPage={20}
              activePage={selectedPage || 1}
              selectPage={selectPage || noop}
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
