import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Dropper = (props: any) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef}  className="w-[300px] h-[300px] bg-gray-300 border-2 border-dashed border-black flex justify-center items-center flex" >
      {props.children}
    </div>
  );
};

export default Dropper;