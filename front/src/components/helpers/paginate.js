import React, { Component } from "react";
import { Pagination } from "react-instantsearch-dom";
let active;
const Paginate = props => {
    const PageLinks = [];
    for (let i = 1; i <= props.pages; i++) {
        active = props.currentPage === i ? " active" : " ";
        PageLinks.push(
            <li
                className={`page-item ${active}`}
                key={i}
                onClick={() => props.nextPage(i)}
            >
                <a href="#" className="page-link">
                    {i}
                </a>
            </li>
        );
    }
    return (
        <div className="container">
            <div className="row">
                <ul className="pagination">
                    {props.currentPage > 1 ? (
                        <li
                            className={`page-item `}
                            onClick={() => {
                                props.nextPage(props.currentPage - 1);
                            }}
                        >
                            <a href="#" className="page-link">
                                ←
                            </a>
                        </li>
                    ) : (
                        ""
                    )}

                    {PageLinks}

                    {props.currentPage <= props.pages ? (
                        <li
                            className="page-item"
                            onClick={() => props.nextPage(props.currentPage + 1)}
                        >
                            <a href="#" className="page-link">
                                →
                            </a>
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
