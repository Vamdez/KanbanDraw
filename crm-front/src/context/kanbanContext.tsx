'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AddCard } from '@/@types/card';
import { DroppersByProject, CardsByDropper } from '@/@types/fetchProjects';
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { MockData } from '@/Utils/templates';
import { arrayMove } from '@dnd-kit/sortable';
import { ModalItem } from '@/components/modules/kanbanBoard/kanbanBoardUtils';

 export interface KanbanContextType {
  items: DroppersByProject[];
  selectedItem: ModalItem | null;
  activeId: UniqueIdentifier | null;
  activeType: 'container' | 'card' | null;
  addCard: (addCard: AddCard) => void;
  addDropper: (titleContainer:string, idContainer: string) => void;
  updateCard: (updatedCard: CardsByDropper) => void;
  handleCardClick: (item: ModalItem) => void;
  handleCloseModal: () => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

interface KanbanProviderProps {
  children: ReactNode;
  initialDroppers?: DroppersByProject[];
}

export const  KanbanProvider = ({ children, initialDroppers }: KanbanProviderProps) => {
  const [items, setItems] = useState<DroppersByProject[]>(initialDroppers || []);
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'container' | 'card' | null>(null);


  const addCard = (idContainer: string, newCard: CardsByDropper) => {
    setItems((prev) => prev.map(container => 
      container.id === idContainer 
        ? { ...container, cards: [...container.cards, newCard] }
        : container
    ));
  };

  const addDropper = (titleContainer:string, idContainer: string) => {
    setItems((prev) => [...prev, { id: idContainer, title: titleContainer, cards: [] }]);
  };

  const updateCard = (updatedCard: CardsByDropper) => {
    setItems((prev) => prev.map(container => ({
      ...container,
      cards: container.cards.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    })));
  };

  const handleCardClick = (item: ModalItem) => {
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
      addDropper,
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