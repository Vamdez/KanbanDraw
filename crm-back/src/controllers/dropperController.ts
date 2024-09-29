import { Request, Response } from 'express';
import dropperService from '../services/dropperService';
import { Dropper } from '../types/kanbanTypes';

export const getDroppers = async(req: Request, res: Response) => {
    try {
        const droppers = await dropperService.getDroppers();
        res.status(200).json(droppers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching droppers'});
    }
};

export const getDroppersByProjectId = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const droppers = await dropperService.getDroppersByProjectId(id);
        res.status(200).json(droppers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching droppers'});
    }
};

export const createDropper = async(req: Request, res: Response) => {
    try {
        const dropper = req.body;
        const newDropper = await dropperService.createDropper(dropper);
        res.status(201).json(newDropper);
    } catch (error) {
        res.status(500).json({ message: 'Error creating dropper'});
    }
};

export const updateDropper = async(req: Request, res: Response) => {
    try {
        const dropper = req.body;
        const id = parseInt(req.params.id, 10);
        const updatedDropper = await dropperService.updateDropper(id, dropper);
        res.status(200).json(updatedDropper);
    } catch (error) {
        res.status(500).json({ message: 'Error updating dropper'});
    }
};

export const deleteDropper = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedDropper = await dropperService.deleteDropper(id);
        res.status(200).json(deletedDropper);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dropper'});
    }
};