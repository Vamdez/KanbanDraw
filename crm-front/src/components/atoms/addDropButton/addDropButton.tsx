import React from 'react';

interface PropsAddDropButton {
  handleClick: () => void;
}

export const AddDropButton = ({ handleClick }: PropsAddDropButton) => {
  return (
    <button
      className="h-75 mt-10 flex w-10 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-500"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};
