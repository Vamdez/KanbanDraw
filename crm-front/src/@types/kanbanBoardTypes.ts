export interface CardItems {
    idCard: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
}

export interface DroppersItems {
    idDropper: number;
    titleDropper: string;
    positionDropper: number;
}

export interface newCardItem {
    titleCard: string;
    contentCard: string;
    positionCard: number;
}

export interface newDroppersItem {
    titleDropper: string;
    positionDropper: number;
}


export interface ItemsProject {
    idDropper: number;
    titleDropper: string;
    positionDropper: number;
    cards: CardItems[];
}

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

export interface ModalItem {
    idDropper: number;
    titleDropper: string;
    idCard: number;
    titleCard: string;
    contentCard: string;
}