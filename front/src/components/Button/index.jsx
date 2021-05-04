import React from 'react';

const BackButton = ({className, onClick}) => {
  return (
    <div className={className}>
      <button
      onClick={onClick}
      className="btn btn-primary mb-4"
      type="button"
    >
      Назад
    </button>
    </div>
  );
};

export default BackButton;
