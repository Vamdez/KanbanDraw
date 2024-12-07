export interface RequestCard {
  id?: number;
  fk_dropper: number;
  title: string;
  content: string;
  position: number;
}

export interface RequestDropper {
  id?: number;
  title: string;
  position: number;
  fk_project: number;
}

export interface CardsByDropper {
  idCard?: number;
  titleCard: string;
  contentCard: string;
  positionCard: number;
}

export interface DroppersByProject {
  idDropper?: number;
  titleDropper: string;
  positionDropper: number;
  cards: CardsByDropper[];
}

export interface ProjectUpdateRequest {
  droppers: RequestDropper[];
  cards: RequestCard[];
  cardsIdDelete: number[];
  droppersIdDelete: number[];
}

export interface CardsByItems {
  titleCard: string;
  idCard: number;
  contentCard: string;
}

export interface ItemsByProject {
  idDropper: number;
  titleDropper: string;
  cards: CardsByItems[];
}

export interface GetCardsResponse {
  idCard: number;
  titleCard: string;
  contentCard: string;
  positionCard: number;
}

export interface GetDroppersResponse {
  idDropper: number;
  titleDropper: string;
  positionDropper: number;
  cards: CardsByItems[];
}
