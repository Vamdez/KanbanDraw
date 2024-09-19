import React, { CSSProperties } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface PropsDropper {
  id: UniqueIdentifier;
  children: React.ReactNode;
  style?: CSSProperties;
  title?: string;
  titleClassName?: string;
  dropperClassName?: string;
}

const Dropper: React.FC<PropsDropper> = ({ id, children, style, title, titleClassName, dropperClassName }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    over,
  } = useSortable({ id: id });

  const dropperStyles: CSSProperties = {
    ...style,
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div className="flex flex-col items-center" ref={setNodeRef} {...attributes} {...listeners}>
      {title && (
        <div className={`text-xl font-semibold mb-2 ${titleClassName}`}>
          {title}
        </div>
      )}
      <div
        className={`w-[300px] h-[300px] rounded-xl border-2 
          flex justify-center items-center transition-all duration-200 ease-in-out 
          ${dropperClassName}`}
        style={dropperStyles}
      >
        <div className="w-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropper;

