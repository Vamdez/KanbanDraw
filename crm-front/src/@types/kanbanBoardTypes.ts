export interface CardItems {
    idCard?: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
}

export interface DroppersItems {
    idDropper?: number;
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
    idCard?: number;
    idDropper: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
}

export interface RequestDropper {
    idDropper?: number;
    titleDropper: string;
    positionDropper: number;
}

export interface ModalItem {
    idDropper: number;
    titleDropper: string;
    idCard: number;
    titleCard: string;
    contentCard: string;
}