'use client';

import React, { useState } from 'react';
import DragBox from '@components/drageBox/dragBox';
import Dropper from '@components/dropper/dropper';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import BoxKanban from '@components/Box/boxKanban';
import { styleBoxDropper } from '@utils/templates';


type KanbanItem = {
  id: number;
  title: string;
  type: string;
};

type KanbanItems = {
  [key: UniqueIdentifier]: KanbanItem[];
};

export default function Home() {
  const [items, setItems] = useState<KanbanItems>({
    droppable: [
      { id: 1, title: 'Box 1', type: 'Kanban 1' },
      { id: 2, title: 'Box 2', type: 'Kanban 2' },
    ],
    droppable2: [
      { id: 3, title: 'Box 3', type: 'Kanban 3' },
    ],
  });

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
      <DndContext onDragEnd={handleDragEnd}>
        <Dropper id="droppable" style={styleBoxDropper} title='Em Andamento'>
          {items.droppable.map(item => (
            <DragBox key={item.id} id={item.id}>
              <BoxKanban title={item.title} type={item.type} />
            </DragBox>
          ))}
        </Dropper>
        <Dropper id="droppable2" style={styleBoxDropper} title='Concluído'>
          {items.droppable2.map(item => (
            <DragBox key={item.id} id={item.id}>
              <BoxKanban title={item.title} type={item.type} />
            </DragBox>
          ))}
        </Dropper>
      </DndContext>
    </div>
  );
}