export interface CardsByDropper {
    idCard: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
    createdAtCard: string;
    updatedAtCard: string;
}

export interface DroppersByProject {
    idDropper: number;
    titleDropper: string;
    positionDropper: number;
    cards: CardsByDropper[];
}