import * as React from 'react';
import { Article } from '../entities/types/article';
import { Comment } from '../entities/types/comment';

export type ArticleContext = Partial<{
  article: Article;
  comments: Comment[];
}>;

export const articleContext = React.createContext<ArticleContext>({});
