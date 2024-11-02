import db from '../models';
import { Project } from '../types/kanbanTypes';
import { ProjectbyIdResponse, DroppersbyProject, CardRequest, Card, ProjectUpdateRequest, DropperRequest } from '../types/projectTypes';

const getProjects = async () => {
    return await db.Project.findAll();
};

const updateProjects = async (projectStructure: ProjectUpdateRequest) => {
    const t = await db.sequelize.transaction();
    try {
        const droppersToUpdate = projectStructure.droppers.filter(d => d.id);
        const droppersToInsert = projectStructure.droppers.filter(d => !d.id);

        await db.Dropper.bulkCreate(droppersToInsert, { transaction: t });

        if (droppersToUpdate.length > 0) {
            await db.Dropper.bulkCreate(droppersToUpdate, {
                updateOnDuplicate: ['title', 'position', 'fk_projects'],
            }, { transaction: t });
        }

        const cardsToUpdate = projectStructure.cards.filter(c => c.id);
        const cardsToInsert = projectStructure.cards.filter(c => !c.id);

        await db.Cards.bulkCreate(cardsToInsert, { transaction: t });

        if (cardsToUpdate.length > 0) {
            await db.Cards.bulkCreate(cardsToUpdate, {
                updateOnDuplicate: ['title', 'content', 'position', 'fk_dropper'],
            }, { transaction: t });
        }

        if (projectStructure.cardsIdDelete.length > 0) {
            await db.Cards.destroy({
                where: {
                    id: projectStructure.cardsIdDelete
                }
            }, { transaction: t });
        }

        if (projectStructure.droppersIdDelete.length > 0) {
            await db.Dropper.destroy({
                where: {
                    id: projectStructure.droppersIdDelete
                }
            }, { transaction: t });
        }

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
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
                    ['title', 'titleCard'],
                    ['content', 'contentCard'],
                    ['position', 'positionCard'],
                    ['created_at', 'createdAtCard'],
                    ['updated_at', 'updatedAtCard']
                ],
            }
        ],
        order:
            [
                ['position', 'ASC'],
                [{ model: db.Cards, as: 'cards' }, 'position', 'ASC']
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
    deleteProject,
    getProjectbyId,
    updateProjects
};