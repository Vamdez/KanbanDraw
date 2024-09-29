export interface Card {
    titulo: string;
    tipo: string;
    content: string;
    position: number;
    fk_Dropper: number;
}

export interface CardCreate {
    titulo: string;
    tipo: string;
    content: string;
    fk_Dropper: number;
}

export interface Dropper {
    title: string;
    position: number;
    fk_Project: number;
}

export interface Project {
    name: string;
}