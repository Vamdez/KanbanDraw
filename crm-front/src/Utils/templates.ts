import { KanbanItems } from '@/@types/cardBox';

export const styleBoxDropper = {
  backgroundColor: '#E0E0E0',
  padding: '10px',
  boxShadow: '0 0 5px #000',
};

export const MockData: KanbanItems[] = [
  {
    id: 'droppable',
    title: 'Em Andamento',
    cards: [
      { id: 1, title: 'Box 1', type: 'Kanban 1', status: 'Em Andamento' },
      { id: 2, title: 'Box 2', type: 'Kanban 2', status: 'Em Andamento' },
    ],
  },
  {
    id: 'droppable2',
    title: 'Concluído',
    cards: [{ id: 3, title: 'Box 3', type: 'Kanban 3', status: 'Concluído' }],
  },
];
