import 'react';
import { FC, MouseEvent, useMemo } from 'react';
import * as React from 'react';
import { Maybe } from '../../../utils/types/Maybe';
import { DEFAULT_FEED_NAME, Feed, PERSONAL_FEED_NAME } from '../Feed.type';

const DEFAULT_FEED: Feed = {
  name: 'Global feed',
  value: DEFAULT_FEED_NAME
};

const PERSONAL_FEED: Feed = {
  name: 'Your feed',
  value: PERSONAL_FEED_NAME
};

export const FeedSelector: FC<{
  selectedFeed: Maybe<string>;
  selectFeed: (feedName: string) => any;
  selectedTag: Maybe<string>;
  isLoggedIn: boolean;
}> = ({ selectedFeed, selectFeed, selectedTag, isLoggedIn }) => {
  const feeds = useMemo<Feed[]>(() => {
    const feedsDraft: Feed[] = [];

    if (isLoggedIn) {
      feedsDraft.push(PERSONAL_FEED);
    }

    feedsDraft.push(DEFAULT_FEED);

    if (selectedTag) {
      const tagFeed = { name: selectedTag, value: selectedTag };
      feedsDraft.push(tagFeed);
    }

    return feedsDraft;
  }, [selectedTag, isLoggedIn]);

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
