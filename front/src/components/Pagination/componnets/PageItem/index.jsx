import React from 'react';

const PageItem = ({ currentPage, handleChangePage, pages, rangePage }) =>
  pages.map(
    (page, index) =>
      rangePage(currentPage).includes(page) && (
        <li
          key={index}
          className={`${currentPage === page ? 'active' : null} page-item`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => handleChangePage(page)}
          >
            {page}
          </a>
        </li>
      )
  );

export default PageItem;
