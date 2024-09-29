import { Router } from 'express';
import { getCards, getCardsByDropperId, createCard, updateCard, deleteCard } from '../controllers/cardController';

const router = Router();

router.get('/', getCards);
router.get('/dropper/:id', getCardsByDropperId);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);


export default router;