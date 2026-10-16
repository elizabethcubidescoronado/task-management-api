import { getAuthenticatedUser } from "../types/auth";
import { Request, Response, NextFunction } from "express";
import { createTaskService, getTasksByUserId } from "../services/task.service";
import { getTaskByIdService } from "../services/task.service";
import { updateTaskService } from "../services/task.service";
import { deleteTaskService } from "../services/task.service";


/**
 * Devuelve las tareas del usuario autenticado.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function getTasks(req: Request, res: Response) {
    const userId = getAuthenticatedUser(req).id;
    const tasks = await getTasksByUserId(userId);
    res.json(tasks);
}
/**
 * Crea una tarea para su propietario.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function createTask(req: Request, res: Response) {

    const userId = getAuthenticatedUser(req).id;
    const { title, description, due_date, status } = req.body;
    const newTask = await createTaskService(title, description, due_date, status, userId);
    res.status(201).json(newTask);
}

/**
 * Consulta una tarea del usuario y delega los errores al middleware central.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = getAuthenticatedUser(req).id;
        const task = await getTaskByIdService(taskId, userId);
        res.json(task);
    } catch (error) {
        next(error);
    }
}

/**
 * Reemplaza los campos editables de una tarea del usuario.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = getAuthenticatedUser(req).id;
        const { title, description, due_date, status } = req.body;
        const updatedTask = await updateTaskService(taskId, userId, title, description, due_date, status);
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
}

/**
 * Elimina una tarea del usuario y devuelve el objeto eliminado.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const taskId = parseInt(String(req.params.id ?? ""), 10);
        const userId = getAuthenticatedUser(req).id;
        const deletedTask = await deleteTaskService(taskId, userId);
        res.json(deletedTask);
    } catch (error) {
        next(error);
    }
}