'use client';

import React from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragBox from '@/components/atoms/drageBox/dragBox';
import Dropper from '@/components/atoms/dropper/dropper';
import BoxKanban from '@/components/atoms/Box/boxKanban';
import ModalBox from '@/components/atoms/ModalBox/modalBox';
import { AddCardButton } from '@/components/atoms/addCardButton/addCardButton';
import { AddDropButton } from '@/components/atoms/addDropButton/addDropButton';
import { useKanban, KanbanContextType } from '@/context/kanbanContext';
import { styleBoxDropper } from '@utils/templates';
import { KanbanItems, CardBox } from '@/@types/cardBox';
import { UniqueIdentifier } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const KanbanBoard = () => {
  const {
    items,
    selectedItem,
    activeId,
    activeType,
    addCard,
    addDropper,
    handleCardClick,
    handleCloseModal,
    handleDragStart,
    handleDragEnd
  }:KanbanContextType = useKanban();


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

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
    <div className="bg-white h-screen w-screen overflow-hidden flex items-center select-none">
      <DndContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd} 
        sensors={sensors}
      >
        <div className="flex flex-row gap-4 p-4 min-w-full">
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
                <AddCardButton handleClick={() => addCard(item.id, { id: Date.now(), title: 'New Card', type: 'Default', status: item.title })} />
              </Dropper>
            ))}
          </SortableContext>
          <AddDropButton handleClick={() => addDropper("newContainer", 'Novo' )} />
          <DragOverlay>
            {renderDragOverlay()}
          </DragOverlay>
        </div>
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

export	default KanbanBoard;