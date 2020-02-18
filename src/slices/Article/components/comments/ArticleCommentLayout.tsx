import React, { FC, ReactChild } from 'react';

export const ArticleCommentLayout: FC<{
  footer?: ReactChild;
  body?: ReactChild;
}> = ({ footer, body }) => {
  return (
    <div className="card">
      <div className="card-block">
        {body}
        {/*{body || <DefaultCommentBody comment={ comment }/>}*/}
      </div>
      <div className="card-footer">
        {footer}
        {/*{footer || <DefaultCommentFooter comment={ comment }/>}*/}
      </div>
    </div>
  );
};
