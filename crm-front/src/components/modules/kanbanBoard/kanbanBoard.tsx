'use client';

import { CardsByDropper, ItemsByProject } from '@/@types/fetchProjects';
import BoxKanban from '@/components/atoms/Box/boxKanban';
import ModalBox from '@/components/modules/modalBox/modalBox';
import { AddCardButton } from '@/components/atoms/addCardButton/addCardButton';
import { AddDropButton } from '@/components/atoms/addDropButton/addDropButton';
import DragBox from '@/components/atoms/drageBox/dragBox';
import Dropper from '@/components/atoms/dropper/dropper';
import { KanbanContextType, useKanban } from '@/context/kanbanContext';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { styleBoxDropper } from '@utils/templates';

export interface ModalItem {}

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
    handleDragEnd,
  }: KanbanContextType = useKanban();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
  );

  console.log('ITEMS', items);

  const renderDragOverlay = () => {
    if (!activeId) return null;

    if (activeType === 'container') {
      const item = items.find((itemFind) => itemFind.idDropper === activeId);
      const containerItem = item as ItemsByProject;
      console.log('Container', containerItem);
      return (
        <Dropper
          id={containerItem.idDropper}
          style={styleBoxDropper}
          title={containerItem.titleDropper}
          isDragging
        >
          {containerItem.cards.map((card) => (
            <DragBox key={card.idCard} id={card.idCard}>
              <BoxKanban
                title={card.titleCard}
                content={card.contentCard}
                id={card.idCard}
              />
            </DragBox>
          ))}
        </Dropper>
      );
    } else {
      let item;
      for (const container of items) {
        const card = container.cards.find((c) => c.idCard === activeId);
        if (card) {
          item = card;
          break;
        }
      }
      const cardItem = item as CardsByDropper;
      console.log('Card', cardItem);
      return (
        <BoxKanban
          title={cardItem.titleCard}
          content={cardItem.contentCard}
          id={cardItem.idCard ? cardItem.idCard : 0}
        />
      );
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
          <SortableContext
            items={items.map((item) => item.idDropper)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <Dropper
                key={item.idDropper}
                id={item.idDropper}
                style={styleBoxDropper}
                title={item.titleDropper}
              >
                <SortableContext
                  items={item.cards.map((card) => card.idCard)}
                  strategy={verticalListSortingStrategy}
                >
                  {item.cards.map((card) => (
                    <DragBox
                      key={card.idCard}
                      id={card.idCard ? card.idCard : 0}
                    >
                      <div
                        onClick={() =>
                          handleCardClick({
                            idDropper: item.idDropper,
                            titleDropper: item.titleDropper,
                            idCard: card.idCard,
                            titleCard: card.titleCard,
                            contentCard: card.contentCard,
                          })
                        }
                      >
                        <BoxKanban
                          title={card.titleCard}
                          content={card.contentCard}
                          id={card.idCard ? card.idCard : 0}
                        />
                      </div>
                    </DragBox>
                  ))}
                </SortableContext>
                <AddCardButton
                  handleClick={() =>
                    addCard(item.idDropper, {
                      titleCard: 'New Card',
                      contentCard: 'New Content',
                      positionCard: item.cards.length + 1,
                    })
                  }
                />
              </Dropper>
            ))}
          </SortableContext>
          <AddDropButton
            handleClick={() => {
              addDropper({
                titleDropper: 'newDropper',
                positionDropper: items.length + 1,
              });
            }}
          />
          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </div>
      </DndContext>

      {selectedItem && (
        <ModalBox data={selectedItem} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default KanbanBoard;
