import * as React from 'react';
import { Maybe } from '../../utils/types/Maybe';
import { SetState } from '../../utils/types/SetState';
import { Feed } from './Feed.type';

export type HomeContext = Partial<{
  selectTag: SetState<Maybe<string>>;
  feeds: Feed[];
  selectedTag: Maybe<string>;
  tags: string[];
  selectFeed: (feed: string) => any;
  selectedFeed: Maybe<string>;
  selectedPage: number;
  selectPage: SetState<number>;
  total: number;
  favoriteArticle: (slug: string, isFavorite: boolean) => any;
}>;

export const context = React.createContext<HomeContext>({});
