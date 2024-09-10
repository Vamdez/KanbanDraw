'use client';

import React from 'react';
import StateBox from './Components/StateBox/stateBox';
import Dropper from './Components/dropper/dropper';
import {DndContext} from '@dnd-kit/core';
import {useState} from 'react';

export default function Home() {
  const [parent, setParent] = useState(null);
  const draggable = (
    <StateBox id="draggable">
      StateBox
    </StateBox>
  );
  const handleDragEnd = (over: any) => {
    setParent(over ? over.id : null);
  };
  return (
    <div className="bg-red-500 h-screen w-screen">
      <DndContext>
        <StateBox id="parent">
          StateBox
        </StateBox>
      </DndContext>
    </div>
  );
}
