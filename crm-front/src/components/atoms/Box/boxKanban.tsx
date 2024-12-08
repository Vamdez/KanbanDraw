import React from 'react';
import { useKanban, KanbanContextType } from '@/context/kanbanContext';

interface PropsBoxKanban {
  title: string;
  content: string;
  id: number;
}

const BoxKanban = ({ title, content, id }: PropsBoxKanban) => {
  const { deleteCards }: KanbanContextType = useKanban();

  return (
    <div className="mb-2 h-40 w-full cursor-pointer rounded-md bg-white shadow-md transition-shadow duration-200 hover:shadow-xl">
      <span
        color="black"
        className="absolute right-4 top-2 z-10 mb-2 text-xl font-semibold text-gray-300"
        onClick={() => deleteCards(id)}
      >
        x
      </span>
      <div className="h-full border-l-4 border-green-500 p-3">
        <h3 className="mb-1 text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default BoxKanban;
