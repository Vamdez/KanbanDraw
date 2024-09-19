'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, PointerSensor, useSensors, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragBox from '@components/drageBox/dragBox';
import Dropper from '@components/dropper/dropper';
import BoxKanban from '@components/Box/boxKanban';
import ModalBox from '@components/ModalBox/modalBox';
import { styleBoxDropper } from '@utils/templates';
import { KanbanItems, CardBox } from '@/@types/cardBox';

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

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'container' | 'card' | null>(null);
  const [selectedItem, setSelectedItem] = useState<CardBox | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleCardClick = (item: CardBox) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveType(items.some(item => item.id === active.id) ? 'container' : 'card');
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
          const overContainer = prev[overCardContainerIndex];
          const activeCardIndex = activeContainer.cards.findIndex((card) => card.id === active.id);
          const overCardIndex = overContainer.cards.findIndex((card) => card.id === over.id);

          const newItems = [...prev];
          const [movedCard] = newItems[activeCardContainerIndex].cards.splice(activeCardIndex, 1);
          newItems[overCardContainerIndex].cards.splice(
            overCardIndex >= 0 ? overCardIndex : newItems[overCardContainerIndex].cards.length,
            0,
            { ...movedCard, status: newItems[overCardContainerIndex].title }
          );

          return newItems;
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

    setActiveId(null);
    setActiveType(null);
  };

  const findItemById = (id: UniqueIdentifier): CardBox | KanbanItems | null => {
    const container = items.find(item => item.id === id);
    if (container) return container;

    for (const container of items) {
      const card = container.cards.find(c => c.id === id);
      if (card) return card;
    }
    return null;
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;
  
    const item = findItemById(activeId);
    if (!item) return null;
  
    if (activeType === 'container') {
      const containerItem = item as KanbanItems;
      return (
        <Dropper 
          id={containerItem.id} 
          style={styleBoxDropper} 
          title={containerItem.title} 
          isDragging
        >
          {containerItem.cards.map((card) => (
            <DragBox key={card.id} id={card.id}>
              <BoxKanban title={card.title} type={card.type} />
            </DragBox>
          ))}
        </Dropper>
      );
    } else {
      const cardItem = item as CardBox;
      return <BoxKanban title={cardItem.title} type={cardItem.type} />;
    }
  };

  return (
    <div className="bg-red-500 h-screen w-screen overflow-hidden flex justify-around items-center select-none">
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        sensors={sensors}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <Dropper key={item.id} id={item.id} style={styleBoxDropper} title={item.title}>
              <SortableContext items={item.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
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
        <DragOverlay>
          {renderDragOverlay()}
        </DragOverlay>
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