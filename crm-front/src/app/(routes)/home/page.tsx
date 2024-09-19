'use client';

import React, { useState } from 'react';
import DragBox from '@components/drageBox/dragBox';
import Dropper from '@components/dropper/dropper';
import { DndContext, DragEndEvent, UniqueIdentifier, useSensor, PointerSensor, useSensors } from '@dnd-kit/core';
import BoxKanban from '@components/Box/boxKanban';
import { styleBoxDropper } from '@utils/templates';
import ModalBox from '@components/ModalBox/modalBox';
import { KanbanItems, CardBox } from '@/@types/cardBox';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

export default function Home() {
  const [items, setItems] = useState<KanbanItems[]>([
    {
      id: 'droppable',
      title: 'Em Andamento',
      cards: [
        { id: 1, title: 'Box 1', type: 'Kanban 1', status: 'Em Andamento' },
        { id: 2, title: 'Box 2', type: 'Kanban 2', status: 'Em Andamento' },
      ]
    },
    {
      id: 'droppable2',
      title: 'Concluído',
      cards: [
        { id: 3, title: 'Box 3', type: 'Kanban 3', status: 'Concluído' },
      ]
    }
  ]);

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
    console.log(event, "event");
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prev) => {
        const activeContainerIndex = prev.findIndex((container) => container.id === active.id);
        const overContainerIndex = prev.findIndex((container) => container.id === over.id);

        if (activeContainerIndex !== -1 && overContainerIndex !== -1) {
          return arrayMove(prev, activeContainerIndex, overContainerIndex);
        }

        const activeCardContainerIndex = prev.findIndex((container) =>
          container.cards.some((card) => card.id === active.id)
        );
        const overCardContainerIndex = prev.findIndex((container) =>
          container.id === over.id || container.cards.some((card) => card.id === over.id)
        );

        if (activeCardContainerIndex !== overCardContainerIndex) {
          const activeContainer = prev[activeCardContainerIndex];
          const activeCardIndex = activeContainer.cards.findIndex((card) => card.id === active.id);
          const movedCard = activeContainer.cards[activeCardIndex];

          return prev.map((container, index) => {
            if (index === activeCardContainerIndex) {
              return {
                ...container,
                cards: container.cards.filter((card) => card.id !== active.id),
              };
            } else if (index === overCardContainerIndex) {
              return {
                ...container,
                cards: [...container.cards, { ...movedCard, status: container.title }],
              };
            }
            return container;
          });
        } else {
          const containerIndex = activeCardContainerIndex;
          const oldIndex = prev[containerIndex].cards.findIndex((card) => card.id === active.id);
          const newIndex = prev[containerIndex].cards.findIndex((card) => card.id === over.id);

          return prev.map((container, index) => {
            if (index === containerIndex) {
              return {
                ...container,
                cards: arrayMove(container.cards, oldIndex, newIndex),
              };
            }
            return container;
          });
        }
      });
    }
  };

  return (
    <div className="bg-red-500 h-screen w-screen overflow-hidden flex justify-around items-center select-none">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={items.map(item => item.id)}>
          {items.map((item) => (
            <Dropper key={item.id} id={item.id} style={styleBoxDropper} title={item.title}>
              <SortableContext items={item.cards.map((card) => card.id)}>
                {item.cards.map((card) => (
                  <DragBox key={card.id} id={card.id}>
                    <div onClick={() => handleCardClick(card)}>
                      <BoxKanban title={card.title} type={card.type} />
                    </div>
                  </DragBox>
                ))}
              </SortableContext>
            </Dropper>
          ))}
        </SortableContext>
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