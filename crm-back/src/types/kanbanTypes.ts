export interface Card {
    title: string;
    content: string;
    position: number;
    fk_dropper: number;
    elements_draw: string;
}

export interface CardCreateRequest {
    title: string;
    content: string;
    fk_dropper: number;
    elements_draw: string;
}

export interface Dropper {
    title: string;
    position: number;
    fk_project: number;
}

export interface ProjectRequest {
    name: string;
}