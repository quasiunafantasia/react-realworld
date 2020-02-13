import 'react';
import { MouseEvent } from 'react';
import * as React from 'react';
import { Maybe } from '../../../utils/types/Maybe';
import { Feed } from '../feed.type';

export const FeedSelector = ({
  feeds,
  selectedFeed,
  selectFeed
}: {
  feeds: Feed[];
  selectedFeed: Maybe<string>;
  selectFeed: (feed: Maybe<string>) => any;
}) => {
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