import React from 'react';
import { ModalItem } from '@/@types/kanbanBoardTypes';
import TextField from '../../atoms/textField/textField';
import { KanbanContextType, useKanban } from '@/context/kanbanContext';
import dynamic from 'next/dynamic';
import { ExcalidrawInitialDataState } from '@excalidraw/excalidraw/types/types';
const Excalidraw = dynamic(
  async () => (await import('@excalidraw/excalidraw')).Excalidraw,
  {
    ssr: false,
  },
);
import { useDebounce } from '@hooks/UseDebounce';

const Initial: ExcalidrawInitialDataState = {
  elements: [
    {
      id: 'tKJz8VuPWEQfx00b8gsDg',
      type: 'ellipse',
      x: 224,
      y: 321.5,
      width: 456,
      height: 297,
      angle: 0,
      strokeColor: '#1971c2',
      backgroundColor: 'transparent',
      fillStyle: 'solid',
      strokeWidth: 2,
      strokeStyle: 'solid',
      roughness: 1,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: {
        type: 2,
      },
      seed: 1249415890,
      version: 16,
      versionNonce: 964796690,
      isDeleted: false,
      boundElements: null,
      updated: 1733522451544,
      link: null,
      locked: false,
    },
  ],
};

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

  const handleChangeExcalidraw = (elements: any, appState: any, files: any) => {
    console.log('Elements', elements);
    console.log('AppState', appState);
    console.log('Files', files);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {data.titleDropper === 'new' && <div>Ola</div>}
      <div className="bg-white rounded-lg p-6 h-[1000px] w-[1000px]">
        <div className="flex justify-between items-center mb-4">
          <TextField
            defaultValue={data.titleCard}
            style={{ fontSize: '1.25rem', color: '#1f2937', fontWeight: 600 }}
            handleChange={handleChangeTitle}
          />
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
          onChange={useDebounce(handleChangeExcalidraw, 1000)}
          initialData={Initial}
        />
      </div>
    </div>
  );
};

export default ModalBox;
