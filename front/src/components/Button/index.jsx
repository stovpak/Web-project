import React from 'react';
import './style.css';
import back from '../../assets/images/back.svg';

const BackButton = ({ onClick, title }) => {
  return (
    <div className="d-flex p-0 mb-4 w-100">
      <div className="p-0 align-self-center">
        <button
          className="p-0 align-self-center btn btn-ghost"
          onClick={onClick}
          type="button"
        >
          <img src={back} alt="back" />
        </button>
      </div>
      <span className="m-0 text-center text-large w-100">{title}</span>
    </div>
  );
};

export default BackButton;
