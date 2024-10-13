export interface Card {
    titulo: string;
    content: string;
    position: number;
    fk_dropper: number;
}

export interface CardCreate {
    titulo: string;
    content: string;
    fk_dropper: number;
}

export interface Dropper {
    title: string;
    position: number;
    fk_project: number;
}

export interface Project {
    name: string;
}