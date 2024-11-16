'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ItemsByProject, RequestCard, RequestDropper } from '@/@types/fetchProjects';
import { ModalItem, newDroppersItem, newCardItem } from '@/@types/kanbanBoardTypes';
import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { feachDroppersbyProject, updateDroppersbyProject } from '@/app/(routes)/home/projects';

 export interface KanbanContextType {
  items: ItemsByProject[];
  selectedItem: ModalItem | null;
  activeId: UniqueIdentifier | null;
  activeType: 'container' | 'card' | null;
  addCard: (idDropper: number, addCard: newCardItem) => void;
  addDropper: (dropper: newDroppersItem) => void;
  handleCardClick: (item: ModalItem) => void;
  handleCloseModal: () => void;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

interface KanbanProviderProps {
  children: ReactNode;
  initialDroppers?: ItemsByProject[];
}

export const  KanbanProvider = ({ children, initialDroppers }: KanbanProviderProps) => {
  const [items, setItems] = useState<ItemsByProject[]>(initialDroppers || []);
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [cards, setCards] = useState<RequestCard[]>([]);
  const [droppers, setDroppers] = useState<RequestDropper[]>([]);
  const [deleteCard, setDeleteCard] = useState<number[]>([]);
  const [deleteDropper, setDeleteDropper] = useState<number[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeType, setActiveType] = useState<'container' | 'card' | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await feachDroppersbyProject(1);
        setItems(response);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
  
    fetchInitialData();
  }, []);

  const mapItensToRequests = (itens: ItemsByProject[], projectId: number) => {
    const mapDroppers: RequestDropper[] = itens.map((dropper, position) => ({
      id: dropper.idDropper,
      title: dropper.titleDropper, 
      position,
      fk_project: projectId,
    }));
  
    const mapCards: RequestCard[] = itens.flatMap((dropper) =>
      dropper.cards.map((card, cardPosition) => ({
        id: card.idCard,
        fk_dropper: dropper.idDropper,
        title: card.titleCard,
        content: card.contentCard,
        position: cardPosition,
      }))
    );
  
    return { mapDroppers, mapCards };
  };

  const autoSave = async () => {
    const { mapDroppers, mapCards } = mapItensToRequests(items, 1);
    await updateDroppersbyProject(mapDroppers, mapCards, deleteCard, deleteDropper);
  };

  useEffect(() => {
    const intervalId = setInterval(autoSave, 30000);
    return () => clearInterval(intervalId);
  }, [autoSave]);

  const resetState = () => {
    setCards([]);
    setDroppers([]);
    setDeleteCard([]);
    setDeleteDropper([]);
  }

  const addCard = async(idDropper: number, newCard: newCardItem) => {
    const updatedCard = [
      ...cards,
      {
        title: newCard.titleCard,
        position: newCard.positionCard,
        content: newCard.contentCard,
        fk_dropper: idDropper,
      },
    ];
    setCards(updatedCard);
    await updateDroppersbyProject(droppers, updatedCard, deleteCard, deleteDropper);
    resetState();
    const response = await feachDroppersbyProject(1);
    setItems(response);
  };

  const addDropper = async(dropper: newDroppersItem) => {
    const updatedDroppers = [
      ...droppers,
      {
        title: dropper.titleDropper,
        position: dropper.positionDropper,
        fk_project: 1,
      },
    ];
    
    setDroppers(updatedDroppers);
    await updateDroppersbyProject(updatedDroppers, cards, deleteCard, deleteDropper);
    resetState();
    const response = await feachDroppersbyProject(1);
    setItems(response);
  };

  const handleCardClick = (item: ModalItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.data.current?.id);
    setActiveType(active.data.current?.type);
  };

  const handleDragEnd = (event: DragEndEvent) => { 
      const { active, over } = event; 

      if (over && active.id !== over.id) {
          setItems((prev) => {
            const activeContainerIndex = prev.findIndex((container) => (container.idDropper)+"Dropper" === active.id);
            const overContainerIndex = prev.findIndex((container) => (container.idDropper)+"Dropper" === over.id);
            if (activeContainerIndex !== -1 && overContainerIndex !== -1) {
                prev[activeContainerIndex].cards
                return arrayMove(prev, activeContainerIndex, overContainerIndex);
            }

            const activeCardContainerIndex = prev.findIndex((container) =>
                container.cards.some((card) => (card.idCard)+"Card" === active.id)
            );
            const overCardContainerIndex = prev.findIndex((container) =>
              (container.idDropper)+"Dropper" === over.id || container.cards.some((card) => (card.idCard)+"Card" === over.id)
            );

            if (activeCardContainerIndex !== overCardContainerIndex) {
                const activeContainer = prev[activeCardContainerIndex];
                const overContainer = prev[overCardContainerIndex];
                const activeCardIndex = activeContainer.cards.findIndex((card) => (card.idCard)+"Card" === active.id);
                const overCardIndex = overContainer.cards.findIndex((card) => (card.idCard)+"Card" === over.id);

                const newItems = [...prev];
                const [movedCard] = newItems[activeCardContainerIndex].cards.splice(activeCardIndex, 1); //Delete card of origin Dropper

                newItems[overCardContainerIndex].cards.splice(
                overCardIndex >= 0 ? overCardIndex : newItems[overCardContainerIndex].cards.length,
                0,
                { ...movedCard }
                );

                return newItems;
            } else {
                const containerIndex = activeCardContainerIndex;
                const oldIndex = prev[containerIndex].cards.findIndex((card) => (card.idCard)+"Card" === active.id);
                const newIndex = prev[containerIndex].cards.findIndex((card) => (card.idCard)+"Card" === over.id);

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