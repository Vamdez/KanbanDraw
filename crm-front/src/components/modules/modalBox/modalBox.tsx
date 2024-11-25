import React from 'react';
import { ModalItem } from '@/@types/kanbanBoardTypes';
import TextField from '../../atoms/textField/textField';
import { KanbanContextType, useKanban } from '@/context/kanbanContext';
import { ItemsByProject } from '@/@types/fetchProjects';
import dynamic from "next/dynamic";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  },
);


interface PropsModalBox {
    data: ModalItem;
    handleClose: () => void;
}

const ModalBox = ({ data, handleClose }: PropsModalBox) => {
    const {
        items,
        setItems,
    }:KanbanContextType = useKanban();

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems((prevItems)=>
            prevItems.map((dropper) =>{                
                if(dropper.idDropper === data.idDropper) {
                    return {
                        ...dropper,
                        cards: dropper.cards.map(card =>
                            card.idCard === data.idCard
                                ? { ...card, titleCard: e.target.value }
                                : card
                        )
                    };
                }
                return dropper;
            }
        ));
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {data.titleDropper === 'new' && (<div>Ola</div>)}
            <div className="bg-white rounded-lg p-6 h-[1000px] w-[1000px]">
                <div className="flex justify-between items-center mb-4">
                    <TextField defaultValue={data.titleCard} style={{fontSize: '1.25rem', color: '#1f2937', fontWeight: 600}} handleChange={handleChangeTitle} />
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
                    <p className="text-sm text-gray-600"><span className="font-medium">Content:</span> {data.contentCard}</p>
                </div>
                <Excalidraw/>
            </div>
        </div>
    );
};

export default ModalBox;