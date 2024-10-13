import { title } from 'process';
import db from '../models';
import { Project } from '../types/kanbanTypes';
import { ProjectbyIdResponse, DroppersbyProject, Card } from '../types/projectTypes';

const getProjects = async () => {
    return await db.Project.findAll();
};

const getProjectbyId = async (id: number): Promise<DroppersbyProject[]> => {
    const droppers = await db.Dropper.findAll({
        where: {
            fk_project: id
        },

        attributes: [
            ['id', 'idDropper'], 
            ['title', 'titleDropper'],
            ['position', 'positionDropper']
        ],
        include: [
            {
                model: db.Cards,
                as: 'cards',
                required: false,
                attributes: [
                    ['id', 'idCard'],
                    ['titulo', 'titleCard'],
                    ['content', 'contentCard'],
                    ['position', 'positionCard'],
                    ['created_at', 'createdAtCard'],
                    ['updated_at', 'updatedAtCard']
                ]
            }
        ]
    });

    return droppers.map((dropper: any): ProjectbyIdResponse => ({
        idDropper: dropper.dataValues.idDropper,
        titleDropper: dropper.dataValues.titleDropper,
        positionDropper: dropper.dataValues.positionDropper,
        cards: dropper.dataValues.cards.map((card: any): Card => ({
            idCard: card.dataValues.idCard,
            titleCard: card.dataValues.titleCard,
            contentCard: card.dataValues.contentCard,
            positionCard: card.dataValues.positionCard,
            createdAtCard: card.dataValues.createdAtCard,
            updatedAtCard: card.dataValues.updatedAtCard
        }))
    }));
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
    deleteProject,
    getProjectbyId
};