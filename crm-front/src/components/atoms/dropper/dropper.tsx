import React, { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { KanbanContextType, useKanban } from '@/context/kanbanContext';

interface PropsDropper {
  id: number;
  children: React.ReactNode;
  style?: CSSProperties;
  title?: string;
  titleClassName?: string;
  dropperClassName?: string;
  isDragging?: boolean;
}

const Dropper: React.FC<PropsDropper> = ({
  id,
  children,
  style,
  title,
  titleClassName,
  dropperClassName,
  isDragging,
}) => {
  const { deleteDroppers }: KanbanContextType = useKanban();

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id + 'Dropper',
    data: {
      type: 'container',
      id: id,
    },
  });

  const dropperStyles: CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 1000 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {title && (
        <div
          className={`text-xl font-semibold mb-2 text-gray-600 ${titleClassName}`}
        >
          {title}
        </div>
      )}
      <div
        className={`w-[300px] h-[700px] rounded-xl border-2 
          flex justify-center items-center transition-all duration-200 ease-in-out 
          ${dropperClassName}`}
        style={dropperStyles}
      >
        <span
          color="black"
          className="text-xl font-semibold mb-2 text-gray-600 absolute top-2 right-4"
          onClick={() => deleteDroppers(id)}
        >
          x
        </span>
        <div className="w-full p-4 flex flex-col items-center justify-center overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropper;
