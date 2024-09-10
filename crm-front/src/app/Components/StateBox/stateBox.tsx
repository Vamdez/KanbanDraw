import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

const StateBox = (props: any) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <button className='bg-blue-500 h-20 w-20 p-10 flex justify-center items-center' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

export default StateBox;

//className='bg-blue-500 h-20 w-20 p-10 flex justify-center items-center'