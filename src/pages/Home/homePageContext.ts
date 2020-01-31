import * as React from 'react';
import { Maybe } from '../../utils/types/Maybe';
import { SetState } from '../../utils/types/SetState';
import { Feed } from './feed.type';

export type HomePageContext = Partial<{
  selectTag: SetState<Maybe<string>>;
  feeds: Feed[];
  selectedTag: Maybe<string>;
  tags: string[];
  selectFeed: (feed: Maybe<string>) => any;
  selectedFeed: Maybe<string>;
  selectedPage: number;
  selectPage: SetState<number>;
  total: number;
}>;

export const context = React.createContext<HomePageContext>({});
