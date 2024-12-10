import {
  ProjectUpdateRequest,
  ItemsByProject,
  RequestCard,
  RequestDropper,
  GetDroppersResponse,
  GetCardsResponse,
} from '@/@types/fetchProjects';

export const fetchDroppersbyProject = async (idProject: number) => {
  const response = await fetch(`http://localhost:8000/projects/${idProject}`);
  if (!response.ok) {
    throw new Error('Failed to fetch droppers by project');
  }
  const rawData: GetDroppersResponse[] = await response.json();

  const data: ItemsByProject[] = rawData.map((item) => ({
    idDropper: item.idDropper,
    titleDropper: item.titleDropper,
    cards: item.cards.map((card: GetCardsResponse) => ({
      titleCard: card.titleCard,
      idCard: card.idCard,
      contentCard: card.contentCard,
      elementsDrawCard: card.elementsDrawCard,
    })),
  }));
  return data;
};

export const updateDroppersbyProject = async (
  droppers: RequestDropper[],
  cards: RequestCard[],
  cardsIdDelete: number[],
  droppersIdDelete: number[],
) => {
  const body: ProjectUpdateRequest = {
    droppers: droppers,
    cards: cards,
    cardsIdDelete: cardsIdDelete,
    droppersIdDelete: droppersIdDelete,
  };

  const response = await fetch(`http://localhost:8000/projects/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Update failed');
  }
};
