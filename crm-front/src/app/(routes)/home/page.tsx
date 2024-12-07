import React from 'react';
import KanbanBoard from '@/components/modules/kanbanBoard/kanbanBoard';
import { KanbanProvider } from '@/context/kanbanContext';
import { feachDroppersbyProject } from './projects';

const Home = async () => {
  return (
    <KanbanProvider initialDroppers={await feachDroppersbyProject(1)}>
      <KanbanBoard />
    </KanbanProvider>
  );
};

export default Home;
