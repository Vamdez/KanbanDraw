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
import { DroppersByProject, CardsByDropper } from '@/@types/fetchProjects';
import { UniqueIdentifier } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export interface ModalItem {

}


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

  const findItemById = (id: UniqueIdentifier): CardsByDropper | DroppersByProject | null => {
    const container = items.find(item => item.idDropper === id);
    if (container) return container;

    for (const container of items) {
      const card = container.cards.find(c => c.idCard === id);
      if (card) return card;
    }
    return null;
  };

  const renderDragOverlay = () => {
    if (!activeId) return null;
  
    const item = findItemById(activeId);
    if (!item) return null;
  
    if (activeType === 'container') {
      const containerItem = item as DroppersByProject;
      return (
        <Dropper 
          id={containerItem.idDropper} 
          style={styleBoxDropper} 
          title={containerItem.titleDropper} 
          isDragging
        >
          {containerItem.cards.map((card) => (
            <DragBox key={card.idCard} id={card.idCard}>
              <BoxKanban title={card.titleCard} content={card.contentCard} />
            </DragBox>
          ))}
        </Dropper>
      );
    } else {
      const cardItem = item as CardsByDropper;
      return <BoxKanban title={cardItem.titleCard} content={cardItem.contentCard} />;
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
          <SortableContext items={items.map(item => item.idDropper)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <Dropper key={item.idDropper} id={item.idDropper} style={styleBoxDropper} title={item.titleDropper}>
                <SortableContext items={item.cards.map((card) => card.idCard)} strategy={verticalListSortingStrategy}>
                  {item.cards.map((card) => (
                    <DragBox key={card.idCard} id={card.idCard}>
                      <div onClick={() => handleCardClick({ idDropper: item.idDropper, titleDropper: item.titleDropper, idCard: card.idCard, titleCard: card.titleCard, contentCard: card.contentCard })}>
                        <BoxKanban title={card.titleCard} content={card.contentCard} />
                      </div>
                    </DragBox>
                  ))}
                </SortableContext>
                <AddCardButton handleClick={() => addCard({ idDropper: item.idDropper, title: 'New Card', content: 'New Content' })} />
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