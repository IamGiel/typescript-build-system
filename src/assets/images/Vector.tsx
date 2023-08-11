import React from 'react';

export const Vector = ({ width, height, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 5"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.40332 0L5.11743 4.75L9.83153 0H0.40332Z" fill={fill} />
    </svg>
  );
};
