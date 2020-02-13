import * as React from 'react';
import { Article } from '../../core/entities/articles/article.interface';
import { Comment } from '../../core/entities/comments/comment.interface';

export type ArticleContext = Partial<{
  article: Article;
  comments: Comment[];
}>;

export const articleContext = React.createContext<ArticleContext>({});
