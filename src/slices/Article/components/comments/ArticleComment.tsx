import React, { FC } from 'react';
import { Comment } from '../../../entities/types/comment';
import { ArticleCommentLayout } from './ArticleCommentLayout';

const DefaultCommentFooter: FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <>
      <span className="date-posted">{comment.updatedAt}</span>
    </>
  );
};

const DefaultCommentBody: FC<{ comment: Comment }> = ({ comment }) => {
  return <p className="card-text">{comment.body}</p>;
};

export const ArticleComment: FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <ArticleCommentLayout
      body={<DefaultCommentBody comment={comment} />}
      footer={<DefaultCommentFooter comment={comment} />}
    />
  );
};
