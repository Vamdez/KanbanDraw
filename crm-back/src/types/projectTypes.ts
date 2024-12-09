import { Dropper } from "./kanbanTypes";

export interface Card {
    idCard: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
    createdAtCard: Date;
    updatedAtCard: Date;
    elementsDrawCard: string;
}

export interface ProjectbyIdResponse {
    idDropper: number;
    titleDropper: string;
    positionDropper: number;
    cards: Card[];
};

export interface DroppersbyProject{
    idDropper: number;
    titleDropper: string;
    positionDropper: number;
    idCard: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
    elementsDrawCard: string;
    createdAtCard: Date;
    updatedAtCard: Date;
}

export interface CardRequest {
    id?: number;
    title: string;
    content: string;
    position: number;
    fk_dropper: number;
    elements_draw: string;
}

export interface DropperRequest {
    id?: number;
    title: string;
    position: number;
    fk_projects: number;
}

export interface ProjectUpdateRequest {
    droppers : DropperRequest[];
    cards: CardRequest[];
    cardsIdDelete: number[];
    droppersIdDelete: number[];
}