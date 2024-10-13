import { Request, Response } from 'express';
import kanban from '../db';
import cardService from '../services/cardService';
import { NotFoundError, ConflictError } from '../errors/customErrors';

export const getCards = async(req: Request, res: Response) => {
    try {
        const cards = await cardService.getCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cards'});
    }
};

export const getCardsByDropperId = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const cards = await cardService.getCardsByDropperId(id);
        res.status(200).json(cards);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            console.log(error);
            res.status(500).json({ message: 'Error fetching cards', error: error});
        }
    }
};

export const createCard = async(req: Request, res: Response) => {
    try {
        const card = req.body;
        const newCard = await cardService.createCard(card);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error});
    }
};

export const updateCard = async(req: Request, res: Response) => {
    try {
        const card = req.body;
        const id = parseInt(req.params.id, 10);
        const updatedCard = await cardService.updateCard(id, card);
        res.status(200).json(updatedCard);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof ConflictError) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error updating card' });
        }
    }
};

export const deleteCard = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedCard = await cardService.deleteCard(id);
        res.status(200).json(deletedCard);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error deleting card' });
        }
    }
};
