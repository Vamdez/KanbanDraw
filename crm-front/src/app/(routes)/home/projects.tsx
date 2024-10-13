
export const feachDroppersbyProject = async (idProject: number) => {
    const response = await fetch(`http://localhost:8000/projects/${idProject}`);
    return await response.json();
}