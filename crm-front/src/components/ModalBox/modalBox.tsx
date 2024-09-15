import React from 'react';
import { CardBox } from '@/@types/cardBox';

interface PropsModalBox {
    data: CardBox;
    handleClose: () => void;
}

const ModalBox = ({ data, handleClose }: PropsModalBox) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
                    <button 
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        onClick={handleClose}
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600"><span className="font-medium">Type:</span> {data.type}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {data.status}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalBox;