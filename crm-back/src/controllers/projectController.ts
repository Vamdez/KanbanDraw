import { Request, Response } from 'express';
import projectService from '../services/projectService';
import { Project } from '../types/kanbanTypes';

export const getProjects = async(req: Request, res: Response) => {
    try {
        const projects = await projectService.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects'});
    }
};

export const createProject = async(req: Request, res: Response) => {
    try {
        const project = req.body;
        const newProject = await projectService.createProject(project);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project'});
    }
};

export const updateProject = async(req: Request, res: Response) => {
    try {
        const project = req.body;
        const id = parseInt(req.params.id, 10);
        const updatedProject = await projectService.updateProject(id, project);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project'});
    }
};

export const deleteProject = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedProject = await projectService.deleteProject(id);
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project'});
    }
};