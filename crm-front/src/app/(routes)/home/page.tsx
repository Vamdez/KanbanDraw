'use client';

import React from 'react';
import KanbanBoard from '@/components/modules/kanbanBoard/kanbanBoard';
import { KanbanProvider } from '@/context/kanbanContext';

const Home = () => {

  return (
    <KanbanProvider>
      <KanbanBoard />
    </KanbanProvider>
  )
};

export default Home;