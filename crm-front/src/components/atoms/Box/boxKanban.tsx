
import React from 'react';
import { useKanban, KanbanContextType } from '@/context/kanbanContext';

interface PropsBoxKanban {
    title: string;
    content: string;
    id: number;
}

const BoxKanban = ({ title, content, id }: PropsBoxKanban) => {

  const {
    deleteCards
  }:KanbanContextType = useKanban();

  return (
    
    <div className='w-full h-40 bg-white shadow-md rounded-md mb-2 cursor-pointer hover:shadow-xl transition-shadow duration-200'>
      <span color='black' className='text-xl font-semibold mb-2 text-gray-300 absolute top-2 right-4' onClick = {() => deleteCards(id)}>x</span>
      <div className='p-3 border-l-4 h-full border-green-500'>
        <h3 className='text-sm font-semibold text-gray-800 mb-1'>{title}</h3>
        <p className='text-xs text-gray-600'>{content}</p>
      </div>
    </div>
  );
};

export default BoxKanban;