import React from 'react';

const LikeButton = ({ onClick, likesCount, className }) => (
  <button className={className} onClick={onClick}>
    Понравилось : {likesCount}
  </button>
);

export default LikeButton;
