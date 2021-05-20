import React from 'react';

const SwitchPage = ({
  handleChangePage,
  handleExtremePage,
  displayPrev,
  displayNext,
}) => (
  <>
    <li
      onClick={handleChangePage}
      type="button"
      className="page-item"
      style={{ display: `${displayNext}` }}
    >
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>

    <li onClick={handleExtremePage} className="page-item">
      <a
        className="page-link"
        href="#"
        aria-label="Previous"
        style={{ display: `${displayPrev}` }}
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  </>
);
export default SwitchPage;
