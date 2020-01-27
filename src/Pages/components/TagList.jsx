import 'react';
import * as React from 'react';
import HomePageContext from '../homePageContext';
import { useContext } from 'react';

export const TagList = () => {
  const { tags, selectTag } = useContext(HomePageContext);
  const createOnTagClick = tag => e => {
    e.preventDefault();
    selectTag(tag);
  };

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map(tag => (
          <a
            href="#"
            className="tag-pill tag-default"
            key={tag}
            onClick={createOnTagClick(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
