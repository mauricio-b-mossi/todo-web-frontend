import React from 'react';

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function PlusButton({style, ...props} : Props) {
  return (
    <div style={{cursor: 'pointer', ...style}} {...props}>
      <PlusIcon />
    </div>
  );
}

const PlusIcon = () => {
    return (
        <svg
          fill="#6305dc"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="50px"
          height="50px"
        >
          <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z" />
        </svg>
    );
}
