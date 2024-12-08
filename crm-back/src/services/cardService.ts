import db from '../models';
import { Card, CardCreate } from '../types/kanbanTypes';
import { NotFoundError, ConflictError } from '../errors/customErrors';

const getCards = async () => {
    return await db.Cards.findAll();
};

const getCardsByDropperId = async (id: number) => {
    return await db.Cards.findAll({
        where: {
            fk_dropper: id
        }
    });
};

const createCard = async (card: CardCreate) => {
    const maxPosition = await db.Cards.max('position', { where: { fk_dropper: card.fk_dropper } });
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
            fk_dropper: currentCard.fk_dropper,
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