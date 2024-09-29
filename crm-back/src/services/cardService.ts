import db from '../models';
import { Card, CardCreate } from '../types/kanbanTypes';
import { NotFoundError, ConflictError } from '../errors/customErrors';

const getCards = async () => {
    return await db.Cards.findAll();
};

const getCardsByDropperId = async (id: number) => {
    const currentDropper = await db.Dropper.findOne({where : {id: id}});
    if (!currentDropper) {
        throw new NotFoundError('Dropper not found');
    }
    return await db.Cards.findAll({
        where: {
            fk_Dropper: id
        }
    });
};

const createCard = async (card: CardCreate) => {
    const maxPosition = await db.Cards.max('position');
    const newCard: Card = {
        ...card,
        position: maxPosition ? maxPosition + 1 : 1,
    };
    return await db.Cards.create(newCard);
};

const updateCard = async (id: number, card: Card) => {
    const currentCard = await db.Cards.findByPk(id);
    if (!currentCard) {
        throw new NotFoundError('Card not found');
    }

    const existingCard = await db.Cards.findOne({
        where: {
            fk_Dropper: currentCard.fk_Dropper,
            position: card.position,
        }
    });
    if(existingCard) {
        throw new ConflictError('Position already in use');
    }
    return await db.Cards.update(card, {
        where: {
            id: id
        }
    });
};

const deleteCard = async (id: number) => {
    const currentCard = await db.Cards.findByPk(id);
    if (!currentCard) {
        throw new NotFoundError('Card not found');
    }
    return await db.Cards.destroy({
        where: {
            id: id
        }
    });
};

export default {
    getCards,
    getCardsByDropperId,
    createCard,
    updateCard,
    deleteCard
};