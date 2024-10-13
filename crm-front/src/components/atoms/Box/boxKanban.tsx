
import React from 'react';

interface PropsBoxKanban {
    title: string;
    content: string;
}

const BoxKanban = ({ title, content }: PropsBoxKanban) => {

  return (
    <div className='w-full bg-white shadow-md rounded-md mb-2 cursor-pointer hover:shadow-lg transition-shadow duration-200'>
      <div className='p-3 border-l-4 border-green-500'>
        <h3 className='text-sm font-semibold text-gray-800 mb-1'>{title}</h3>
        <p className='text-xs text-gray-600'>{content}</p>
      </div>
    </div>
  );
};

export default BoxKanban;