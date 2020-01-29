import * as React from 'react';
import { FromCollection } from '../../utils/types/FromCollection';
import { Maybe } from '../../utils/types/Maybe';
import { SetState } from '../../utils/types/SetState';

export type HomePageContext = Partial<{
  selectTag: SetState<Maybe<string>>;
  feeds: { name: string; value: Maybe<string> }[];
  selectedTag: Maybe<string>;
  tags: string[];
  selectFeed: SetState<Maybe<string>>;
  selectedFeed: Maybe<string>;
}>;

export type Feed = FromCollection<HomePageContext['feeds']>;

export const context = React.createContext<HomePageContext>({});
