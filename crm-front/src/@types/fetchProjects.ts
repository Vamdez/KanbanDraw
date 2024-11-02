import { RequestCard, RequestDropper } from "./kanbanBoardTypes";

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
    droppers : RequestDropper[];
    cards: RequestCard[];
    cardsIdDelete: number[];
    droppersIdDelete: number[];
}