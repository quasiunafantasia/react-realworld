import 'react';
import { MouseEvent } from 'react';
import * as React from 'react';
import { useContext } from 'react';
import { context, Feed } from '../homePageContext';

export const FeedSelector = () => {
  const { feeds, selectedFeed, selectFeed } = useContext(context);

  const createSelectFeed = (feed: Feed) => (e: MouseEvent) => {
    e.preventDefault();
    if (selectFeed) {
      selectFeed(feed.value);
    }
  };

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {feeds &&
          feeds.map(feed => (
            <li className="nav-item" key={feed.name}>
              <a
                className={
                  'nav-link ' + (selectedFeed === feed.value ? 'active' : '')
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
