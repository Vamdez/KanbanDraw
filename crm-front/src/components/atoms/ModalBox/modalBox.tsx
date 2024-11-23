import React from 'react';
import { CardsByDropper } from '@/@types/fetchProjects';
import { ModalItem } from '@/@types/kanbanBoardTypes';
import TextField from '../textField/textField';

interface PropsModalBox {
    data: ModalItem;
    handleClose: () => void;
}

const ModalBox = ({ data, handleClose }: PropsModalBox) => {
    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {data.titleDropper === 'new' && (<div>Ola</div>)}
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <TextField defaultValue={data.titleCard} style={{fontSize: '1.25rem', color: '#1f2937', fontWeight: 600}}/>
                    {/* <h3 className="text-xl font-semibold text-gray-800">{data.titleCard}</h3> */}
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
                    <p className="text-sm text-gray-600"><span className="font-medium">Title:</span> {data.titleCard}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Content:</span> {data.contentCard}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalBox;