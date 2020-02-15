import * as React from 'react';
import { Article } from '../entities/article.interface';
import { Comment } from '../entities/comment.interface';

export type ArticleContext = Partial<{
  article: Article;
  comments: Comment[];
}>;

export const articleContext = React.createContext<ArticleContext>({});
