'use client';

import React, { useState } from 'react';
import DragBox from '@components/drageBox/dragBox';
import Dropper from '@components/dropper/dropper';
import { DndContext, DragEndEvent, UniqueIdentifier, TouchSensor, useSensor, MouseSensor, KeyboardSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import BoxKanban from '@components/Box/boxKanban';
import { styleBoxDropper } from '@utils/templates';
import ModalBox from '@components/ModalBox/modalBox';
import { CardBox } from '@/@types/cardBox';



type KanbanItems = {
  [key: UniqueIdentifier]: CardBox[];
};

export default function Home() {
  const [items, setItems] = useState<KanbanItems>({
    droppable: [
      { id: 1, title: 'Box 1', type: 'Kanban 1', status: 'Em Andamento' },
      { id: 2, title: 'Box 2', type: 'Kanban 2', status: 'Em Andamento' },
    ],
    droppable2: [
      { id: 3, title: 'Box 3', type: 'Kanban 3', status: 'Concluído' },
    ],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [selectedItem, setSelectedItem] = useState<CardBox | null>(null);

  const handleCardClick = (item: CardBox) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const activeContainer = Object.keys(items).find(key => 
        items[key].some(item => item.id === active.id)
      );
      const overContainer = over.id;

      if (activeContainer && activeContainer !== overContainer) {
        setItems(prev => {
          const activeItems = prev[activeContainer].filter(item => item.id !== active.id);
          const overItems = [...prev[overContainer], prev[activeContainer].find(item => item.id === active.id)!];
          
          return {
            ...prev,
            [activeContainer]: activeItems,
            [overContainer]: overItems,
          };
        });
      }
    }
  };

  return (
    <div className="bg-red-500 h-screen w-screen overflow-hidden flex justify-around items-center">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Dropper id="droppable" style={styleBoxDropper} title='Em Andamento'>
          {items.droppable.map(item => (
            <DragBox key={item.id} id={item.id}>
              <div onClick={() => handleCardClick(item)}>
                <BoxKanban title={item.title} type={item.type} />
              </div>
            </DragBox>
          ))}
        </Dropper>
        <Dropper id="droppable2" style={styleBoxDropper} title='Concluído'>
          {items.droppable2.map(item => (
            <DragBox key={item.id} id={item.id}>
              <div onClick={() => handleCardClick(item)}>
                <BoxKanban title={item.title} type={item.type} />
              </div>
            </DragBox>
          ))}
        </Dropper>
      </DndContext>

      {selectedItem && (
        <ModalBox
          data={selectedItem}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
}