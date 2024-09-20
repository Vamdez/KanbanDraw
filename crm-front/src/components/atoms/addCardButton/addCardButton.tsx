import React from 'react';

interface PropsAddCardButton {
    handleClick: () => void;
}

export const AddCardButton = ({ handleClick }: PropsAddCardButton) => {
    return (
        <button className="text-gray-600 bg-white hover:text-gray-800 rounded-full w-40 justify-center flex" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    );
};

