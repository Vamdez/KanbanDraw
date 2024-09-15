import React, { CSSProperties } from 'react';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

interface PropsDropper {
  id: UniqueIdentifier;
  children: React.ReactNode;
  style?: CSSProperties;
  title?: string;
  titleClassName?: string;
  dropperClassName?: string;
}

const Dropper: React.FC<PropsDropper> = ({ id, children, style, title, titleClassName, dropperClassName }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col items-center">
      {title && (
        <div className={`text-xl font-semibold mb-2 ${titleClassName}`}>
          {title}
        </div>
      )}
      <div
        ref={setNodeRef}
        className={`w-[300px] h-[300px] rounded-xl border-2 
          ${isOver ? 'bg-blue-200 border-blue-500' : 'bg-gray-300 border-gray-500'}
          flex justify-center items-center transition-all duration-200 ease-in-out 
          ${dropperClassName}`}
        style={{ ...style, position: 'relative' }}
      >
        <div className="absolute inset-0 flex-col p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropper;
