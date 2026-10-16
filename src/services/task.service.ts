import { createTask, findTaskByIdAndUserId, findTasksByUserId } from "../persistence/task.repository";
import { updateTaskByIdAndUserId } from "../persistence/task.repository";
import { deleteTaskByIdAndUserId } from "../persistence/task.repository";
import { AppError } from "../utils/app-error";

/**
 * Obtiene todas las tareas del propietario indicado.
 * @param userId - Identificador del propietario.
 * @returns Lista de tareas; vacia si el usuario no tiene tareas.
 */
export async function getTasksByUserId(userId: number) {
    return await findTasksByUserId(userId);
}

/**
 * Crea una tarea con los datos previamente validados.
 * @param title - Titulo de la tarea.
 * @param description - Descripcion de la tarea.
 * @param due_date - Fecha limite en formato YYYY-MM-DD.
 * @param status - Estado validado por el esquema de tareas.
 * @param userId - Identificador del propietario.
 * @returns Tarea creada, consultada, actualizada o eliminada segun la operacion.
 */
export async function createTaskService(title: string, description: string, due_date: string, status: string, userId: number) {
    return await createTask(title, description, due_date, status, userId);
}
/**
 * Obtiene una tarea comprobando que pertenezca al usuario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @returns Tarea creada, consultada, actualizada o eliminada segun la operacion.
 * @throws {AppError} Con estado 404 si no existe la tarea o pertenece a otro usuario.
 */
export async function getTaskByIdService(taskId: number, userId: number) {
    const task = await findTaskByIdAndUserId(taskId, userId);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }

    return task;
}
/**
 * Actualiza una tarea comprobando que pertenezca al usuario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @param title - Titulo de la tarea.
 * @param description - Descripcion de la tarea.
 * @param due_date - Fecha limite en formato YYYY-MM-DD.
 * @param status - Estado validado por el esquema de tareas.
 * @returns Tarea creada, consultada, actualizada o eliminada segun la operacion.
 * @throws {AppError} Con estado 404 si no existe la tarea o pertenece a otro usuario.
 */
export async function updateTaskService(taskId: number, userId: number, title: string, description: string, due_date: string, status: string) {
    const task = await updateTaskByIdAndUserId(taskId, userId, title, description, due_date, status);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }
    return task;

}

/**
 * Elimina una tarea comprobando que pertenezca al usuario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @returns Tarea creada, consultada, actualizada o eliminada segun la operacion.
 * @throws {AppError} Con estado 404 si no existe la tarea o pertenece a otro usuario.
 */
export async function deleteTaskService(taskId: number, userId: number) {
    const task = await deleteTaskByIdAndUserId(taskId, userId);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }
    return task;
}