import React from 'react';


interface PropsBozKanban {
    title: string;
    type: string;
}

const BoxKanban = (props: PropsBozKanban) => {
  return (
    <div className='bg-blue-500 h-20 w-20 flex z-50'>
        <div className='bg-purple-500 h-20 w-20 p-10 justify-center items-center'>
            {props.title}
        </div>
        <div className='bg-green-500 h-20 w-20 p-10  justify-center items-center'>
            {props.type}
        </div>
    </div>
  );
};

export default BoxKanban;