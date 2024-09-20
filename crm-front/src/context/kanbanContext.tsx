'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KanbanItems, CardBox } from '@/@types/cardBox';
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { MockData } from '@/Utils/templates';
import { arrayMove } from '@dnd-kit/sortable';

 export interface KanbanContextType {
  items: KanbanItems[];
  selectedItem: CardBox | null;
  activeId: UniqueIdentifier | null;
  activeType: 'container' | 'card' | null;
  addCard: (idContainer: string, newCard: CardBox) => void;
  updateCard: (updatedCard: CardBox) => void;
  handleCardClick: (item: CardBox) => void;
  handleCloseModal: () => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export const  KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<KanbanItems[]>(MockData);
  const [selectedItem, setSelectedItem] = useState<CardBox | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'container' | 'card' | null>(null);

  const addCard = (idContainer: string, newCard: CardBox) => {
    setItems((prev) => prev.map(container => 
      container.id === idContainer 
        ? { ...container, cards: [...container.cards, newCard] }
        : container
    ));
  };

  const updateCard = (updatedCard: CardBox) => {
    setItems((prev) => prev.map(container => ({
      ...container,
      cards: container.cards.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    })));
  };

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

  return (
    <KanbanContext.Provider value={{
      items,
      selectedItem,
      activeId,
      activeType,
      addCard,
      updateCard,
      handleCardClick,
      handleCloseModal,
      handleDragStart,
      handleDragEnd
    }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}