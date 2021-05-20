import React from 'react';

const Button = ({ onClick, text, className }) => {
  return (
    <div className={className}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default BackButton;
