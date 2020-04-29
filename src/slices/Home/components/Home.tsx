import { FC } from 'react';
import * as React from 'react';
import { Maybe } from '../../../utils/types/Maybe';
import { SetState } from '../../../utils/types/SetState';
import { useIsLoggedIn } from '../../Auth/currnetUserProvider';
import { Article } from '../../entities/types/article';
import { Header } from './Header';
import { FeedSelector } from './FeedSelector';
import { ArticlePreview } from './ArticlePreview';
import { TagList } from './TagList';
import { Pagination } from './Pagination';

type HomeProps = {
  setSelectedTag: SetState<Maybe<string>>;
  // feeds: Feed[];
  selectedTag: Maybe<string>;
  tags: string[];
  setSelectFeed: (feed: string) => any;
  selectedFeed: Maybe<string>;
  selectedPage: number;
  setSelectedPage: SetState<number>;
  total: number;
  favoriteArticle: (slug: string, isFavorite: boolean) => any;
  articles: Article[];
};

export const Home: FC<HomeProps> = ({
  setSelectedTag,
  selectedTag,
  tags,
  setSelectFeed,
  selectedFeed,
  selectedPage,
  setSelectedPage,
  total,
  favoriteArticle,
  articles
}) => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className="home-page">
      <Header />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedSelector
              selectedFeed={selectedFeed}
              selectFeed={setSelectFeed}
              isLoggedIn={isLoggedIn}
              selectedTag={selectedTag}
            />

            {articles.map(article => (
              <ArticlePreview
                article={article}
                key={article.slug}
                onFavoriteArticle={() =>
                  favoriteArticle(article.slug, !article.favorited)
                }
              />
            ))}

            <Pagination
              perPage={20}
              total={total}
              activePage={selectedPage}
              selectPage={setSelectedPage}
            />
          </div>

          <div className="col-md-3">
            <TagList tags={tags} selectTag={setSelectedTag} />
          </div>
        </div>
      </div>
    </div>
  );
};
