import React from 'react';
import PageItem from './componnets/PageItem';
import { rangeOfPages } from './helpers/rangeOfPages';
import { range } from './helpers/range';

const Pagination = ({
  totalItems,
  itemOnPage = 10,
  pageRange = 5,
  currentPage,
  handleChangePage,
}) => {
  const totalPages = Math.ceil(totalItems / itemOnPage);
  const pages = range(1, totalPages);

  return (
    <nav aria-label="Countries Pagination">
      <ul className="d-flex pagination">
        {currentPage !== 1 && (
          <li
            onClick={() => handleChangePage(currentPage - 1)}
            type="button"
            className="page-item"
            style={{
              display: `${currentPage === pages[0] && 'none'}`,
              order: -1,
            }}
          >
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        <PageItem
          pages={pages}
          rangePage={() => rangeOfPages(currentPage, pageRange, totalPages)}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />

        {currentPage !== totalPages && (
          <li
            onClick={() => handleChangePage(currentPage + 1)}
            className="page-item"
          >
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              style={{
                display: `${currentPage === pages[pages.length - 1]}`,
              }}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Pagination;
