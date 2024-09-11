'use client';

import React, { useState } from 'react';
import DragBox from './Components/drageBox/dragBox';
import Dropper from './Components/dropper/dropper';
import { DndContext } from '@dnd-kit/core';
import BoxKanban from './Components/Box/boxKanban';
import ContainerKanban from './Components/ContainerKanban/conteinerKenban';

export default function Home() {
  const [parent, setParent] = useState<string | null>(null);

  // Definição do componente que será arrastável
  const draggable = (
    <DragBox id="draggable">
      <BoxKanban title="Box" type="Kanban" />
    </DragBox>
  );

  // Função chamada ao final do evento de arrastar
  const handleDragEnd = (event: any) => {
    const { over } = event;

    // Verifica se o item foi arrastado sobre algo
    if (over) {
      setParent(over.id);  // Define o novo 'parent'
    } else {
      setParent(null); // Reseta o 'parent' se o item não for droppado em um alvo válido
    }
  };

  return (
    <div className="bg-red-500 h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        {/* Renderiza o componente arrastável se ele ainda não foi droppado */}
        {!parent ? draggable : null}

        {/* Drop zone com o id 'droppable' */}
        <Dropper id="droppable">
          {parent === "droppable" ? draggable : 'DropHere'}
        </Dropper>
        <Dropper id="droppable2">
          {parent === "droppable2" ? draggable : 'DropHere'}
        </Dropper>
      </DndContext>
    </div>
  );
}
