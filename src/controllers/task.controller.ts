import { Request, Response, NextFunction } from "express";
import { createTaskService, getTasksByUserId } from "../services/task.service";
import { getTaskByIdService } from "../services/task.service";
import { updateTaskService } from "../services/task.service";
import { deleteTaskService } from "../services/task.service";


export async function getTasks(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const tasks = await getTasksByUserId(userId);
    res.json(tasks);
}
export async function createTask(req: Request, res: Response) {

    const userId = (req as any).user.id;
    const { title, description, due_date, status } = req.body;
    const newTask = await createTaskService(title, description, due_date, status, userId);
    res.status(201).json(newTask);
}

export async function getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = (req as any).user.id;
        const task = await getTaskByIdService(taskId, userId);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = (req as any).user.id;
        const { title, description, due_date, status } = req.body;
        const updatedTask = await updateTaskService(taskId, userId, title, description, due_date, status);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = (req as any).user.id;
        const deletedTask = await deleteTaskService(taskId, userId);
        res.json(deletedTask);
    } catch (error) {
        next(error);
    }
}