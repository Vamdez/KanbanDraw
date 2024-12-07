export interface CardBox {
  id: number;
  title: string;
  type: string;
  status?: string;
}

export interface KanbanItems {
  id: string;
  title: string;
  cards: CardBox[];
}
