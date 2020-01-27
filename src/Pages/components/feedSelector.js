import 'react';
import * as React from 'react';
import { useContext } from 'react';
import HomePageContext from '../homePageContext';

export const FeedSelector = () => {
  const { feeds, selectedFeed, selectFeed } = useContext(HomePageContext);

  const createSelectFeed = feed => e => {
    e.preventDefault();
    selectFeed(feed);
  };

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {feeds.map(feed => (
          <li className="nav-item" key={feed.value}>
            <a
              className={
                'nav-link ' +
                (selectedFeed.value === feed.value ? 'active' : '')
              }
              href="/"
              onClick={createSelectFeed(feed)}
            >
              {feed.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
