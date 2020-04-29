import React, { FC, ReactChild } from 'react';

export const ArticleCommentLayout: FC<{
  footer?: ReactChild;
  body?: ReactChild;
}> = ({ footer, body }) => {
  return (
    <div className="card">
      <div className="card-block">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
};
