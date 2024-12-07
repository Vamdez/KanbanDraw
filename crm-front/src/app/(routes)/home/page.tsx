import React from 'react';
import KanbanBoard from '@/components/modules/kanbanBoard/kanbanBoard';
import { KanbanProvider } from '@/context/kanbanContext';
import { fetchDroppersbyProject } from './projects';

const Home = async () => {
  return (
    <KanbanProvider initialDroppers={await fetchDroppersbyProject(1)}>
      <KanbanBoard />
    </KanbanProvider>
  );
};

export default Home;
