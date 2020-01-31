import React, { useMemo, MouseEvent } from 'react';

export const Pagination = ({
  activePage,
  selectPage,
  totalPages
}: {
  activePage: number;
  selectPage: Function;
  totalPages: number;
}) => {
  const pages = useMemo(
    () =>
      Array(totalPages)
        .fill(0)
        .map((_, index) => index + 1),
    [totalPages]
  );

  //todo fix type
  const createHandler = (page: any) => (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    selectPage(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={'page-item' + (page === activePage ? ' active' : '')}
            onClick={createHandler(page)}
            key={page}
          >
            <a className="page-link" href="">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
