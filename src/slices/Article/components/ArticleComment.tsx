import React from 'react';
import { Comment } from '../../entities/types/comment';
//todo add type

const DefaultCommentFooter = ({ comment }: any) => {
  return (
    <>
      <span className="date-posted">{comment.updatedAt}</span>
    </>
  );
};

const DefaultCommentBody = ({ comment }: { comment: Comment }) => {
  return <p className="card-text">{comment.body}</p>;
};

export const ArticleComment = ({ comment, footer, body }: any) => {
  return (
    <div className="card">
      <div className="card-block">
        {body || DefaultCommentBody({ comment })}
      </div>
      <div className="card-footer">
        {footer || DefaultCommentFooter({ comment })}
      </div>
    </div>
  );
};
