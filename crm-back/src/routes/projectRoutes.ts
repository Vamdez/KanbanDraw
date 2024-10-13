import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject, getProjectbyId } from '../controllers/projectController';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectbyId);
router.delete('/:id', deleteProject);
router.post('/', createProject);
router.put('/:id', updateProject);

export default router;