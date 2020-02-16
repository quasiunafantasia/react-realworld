import { Article } from './article';
import { Comment } from './comment';

export interface ArticleWithComments extends Article {
  comments: Comment[];
}
