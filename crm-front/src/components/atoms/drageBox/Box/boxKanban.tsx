import React from 'react';

interface PropsBoxKanban {
  title: string;
  type: string;
}

const BoxKanban = ({ title, type }: PropsBoxKanban) => {
  return (
    <div className="mb-2 w-full cursor-pointer rounded-md bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="border-l-4 border-green-500 p-3">
        <h3 className="mb-1 text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600">{type}</p>
      </div>
    </div>
  );
};

export default BoxKanban;
