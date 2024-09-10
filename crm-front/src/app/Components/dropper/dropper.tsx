import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Dropper = (props: any) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Dropper;