import React, { Component } from "react";

const Paginate = props => {
  const PageLinks = [];
  for (let i = 1; i < props.pages + 1; i++) {
    while (props.currentPage === props.pages) {
      PageLinks.push(
        <li
          className={`waves-effect`}
          key={i}
          onClick={() => props.nextPage(i)}
        >
          <a href="#">{i}</a>
        </li>
      );
    }
  }
  console.log(props.currentPage, "currentPage");

  return (
    <div className="container">
      <div className="row">
        <ul className="pagination">
          {props.currentPage > 1 ? (
            <li
              className={`waves-effect `}
              onClick={() => {
                props.nextPage(props.currentPage - 1);
              }}
            >
              <a href="#">←</a>
            </li>
          ) : (
            ""
          )}
          {PageLinks}
          {props.currentPage < props.pages ? (
            <li
              className={`waves-effect `}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <a href="#">→</a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};
export default Paginate;
