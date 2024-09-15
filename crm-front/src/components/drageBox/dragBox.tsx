import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface PropsDragBox {
  id: number;
  children: React.ReactNode;
}

const DragBox : React.FC<PropsDragBox> = ({ id, children }) => {
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: id,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 'auto',
    position: 'relative' as 'relative',
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-full mb-2">
      {children}
    </div>
  );
};

export default DragBox;