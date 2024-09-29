import { Router } from 'express';
import { getDroppers, getDroppersByProjectId, createDropper, updateDropper, deleteDropper } from '../controllers/dropperController';

const router = Router();

router.get('/', getDroppers);
router.get('/:id', getDroppersByProjectId);
router.post('/', createDropper);
router.put('/:id', updateDropper);
router.delete('/:id', deleteDropper);


export default router;