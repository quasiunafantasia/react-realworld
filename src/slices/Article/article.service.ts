import { apiClient } from '../../core/api/api-client';
import { Article } from '../entities/article.interface';
import { Comment } from '../entities/comment.interface';

export const getArticleBySlug = (slug: string): Promise<Article> =>
  apiClient.get(`/api/articles/${slug}`).then(res => res.data.article);

export const getArticleComments = (slug: string): Promise<Comment[]> =>
  apiClient
    .get(`/api/articles/${slug}/comments`)
    .then(res => res.data.comments);
