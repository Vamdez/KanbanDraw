import React, { useCallback } from 'react';
import { ModalItem } from '@/@types/kanbanBoardTypes';
import TextField from '../../atoms/textField/textField';
import { KanbanContextType, useKanban } from '@/context/kanbanContext';
import dynamic from 'next/dynamic';
// import { ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types/types';
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  },
);
import { useDebounce } from '@hooks/UseDebounce';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';

interface PropsModalBox {
  data: ModalItem;
  handleClose: () => void;
}

const ModalBox = ({ data, handleClose }: PropsModalBox) => {
  const { setItems }: KanbanContextType = useKanban();
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems((prevItems) =>
      prevItems.map((dropper) => {
        if (dropper.idDropper === data.idDropper) {
          return {
            ...dropper,
            cards: dropper.cards.map((card) =>
              card.idCard === data.idCard
                ? { ...card, titleCard: e.target.value }
                : card,
            ),
          };
        }
        return dropper;
      }),
    );
  };

  const handleChangeExcalidraw = useCallback((elements: ExcalidrawElement[]) => {
    setItems((prevItems) =>
      prevItems.map((dropper) => {
        if (dropper.idDropper === data.idDropper) {
          return {
            ...dropper,
            cards: dropper.cards.map((card) =>
              card.idCard === data.idCard
                ? { ...card, elementsDrawCard: JSON.stringify(elements) }
                : card,
            ),
          };
        }
        return dropper;
      }),
    );
  },[data.idCard, data.idDropper, setItems]);


  const debouncedHandleChange = useDebounce(handleChangeExcalidraw, 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {data.titleDropper === 'new' && <div>Ola</div>}
      <div className="h-[70%] w-[70%] rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <TextField
            defaultValue={data.titleCard}
            style={{ fontSize: '1.25rem', color: '#1f2937', fontWeight: 600 }}
            handleChange={handleChangeTitle}
          />
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Content:</span> {data.contentCard}
          </p>
        </div>
        <Excalidraw
          onChange={debouncedHandleChange}
          initialData={data.elementsDrawCard ? {elements:JSON.parse(data.elementsDrawCard)} : null}
        />
      </div>
    </div>
  );
};

export default ModalBox;
