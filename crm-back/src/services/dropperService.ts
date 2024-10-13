import db from '../models';
import { Dropper } from '../types/kanbanTypes';

const getDroppers = async () => {
    return await db.Dropper.findAll();
};

const getDroppersByProjectId = async (id: number) => {
    const droppers = await db.Dropper.findAll({
        where: {
            fk_project: id
        },
        include: [{
            model: db.Cards,
            as: 'cards',
        }],
        order: [
            ['id', 'ASC'],
            [{ model: db.Cards, as: 'cards' }, 'position', 'ASC']
        ]
    });

    return droppers ;
};

const createDropper = async (dropper: Dropper) => {
    return await db.Dropper.create(dropper);
};

const updateDropper = async (id: number, dropper: Dropper) => {
    return await db.Dropper.update(dropper, {
        where: {
            id: id
        }
    });
};

const deleteDropper = async (id: number) => {
    return await db.Dropper.destroy({
        where: {
            id: id
        }
    });
};

export default {
    getDroppers,
    getDroppersByProjectId,
    createDropper,
    updateDropper,
    deleteDropper
};