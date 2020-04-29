import React, { FC, SyntheticEvent, useRef } from 'react';
import { useCurrentUser } from '../../../Auth/currnetUserProvider';
import { ArticleCommentLayout } from './ArticleCommentLayout';

export const AddComment: FC<{ onSubmit: (text: string) => any }> = ({
  onSubmit
}) => {
  const currentUser = useCurrentUser();
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(commentInput.current?.value || '');
  };

  const body = (
    <textarea
      ref={commentInput}
      className="form-control"
      placeholder="Write a comment..."
      rows={3}
    />
  );

  const footer = (
    <>
      <img src={currentUser?.image} className="comment-author-img" alt="" />
      <button className="btn btn-sm btn-primary">Post Comment</button>
    </>
  );
  return (
    <form onSubmit={handleSubmit}>
      <ArticleCommentLayout body={body} footer={footer} />
    </form>
  );
};
