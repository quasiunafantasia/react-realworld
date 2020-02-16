import { apiClient } from '../../core/api/api-client';
import { Article } from '../entities/types/article';
import { Comment } from '../entities/types/comment';

export const getArticleBySlug = (slug: string): Promise<Article> =>
  apiClient.get(`/api/articles/${slug}`).then(res => res.data.article);

export const getArticleComments = (slug: string): Promise<Comment[]> =>
  apiClient
    .get(`/api/articles/${slug}/comments`)
    .then(res => res.data.comments);
