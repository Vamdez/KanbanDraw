import { RequestCard, RequestDropper } from "@/@types/kanbanBoardTypes";
import { ProjectUpdateRequest, ItemsByProject } from "@/@types/fetchProjects";


export const feachDroppersbyProject= async (idProject: number) => {
    const response = await fetch(`http://localhost:8000/projects/${idProject}`);
    return await response.json();
}

export const updateDroppersbyProject = async (droppers: RequestDropper[], cards: RequestCard[], cardsIdDelete: number[], droppersIdDelete: number[]) => {

    const body: ProjectUpdateRequest = {
        droppers: droppers,
        cards: cards,
        cardsIdDelete: cardsIdDelete,
        droppersIdDelete: droppersIdDelete,
    }

    const response = await fetch(`http://localhost:8000/projects/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error('Update failed');
    }
}