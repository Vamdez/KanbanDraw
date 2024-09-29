import db from '../models';
import { Project } from '../types/kanbanTypes';

const getProjects = async () => {
    return await db.Project.findAll();
};

const createProject = async (project: Project) => {
    return await db.Project.create(project);
};

const updateProject = async (id: number, project: Project) => {
    return await db.Project.update(project, {
        where: {
            id: id
        }
    });
};

const deleteProject = async (id: number) => {
    return await db.Project.destroy({
        where: {
            id: id
        }
    });
};

export default {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};