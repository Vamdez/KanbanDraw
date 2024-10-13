export interface Card {
    idCard: number;
    titleCard: string;
    contentCard: string;
    positionCard: number;
    createdAtCard: Date;
    updatedAtCard: Date;
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
    createdAtCard: Date;
    updatedAtCard: Date;
}