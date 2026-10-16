import { createTask, findTaskByIdAndUserId, findTasksByUserId } from "../persistence/task.repository";
import { updateTaskByIdAndUserId } from "../persistence/task.repository";
import { deleteTaskByIdAndUserId } from "../persistence/task.repository";
import { AppError } from "../utils/app-error";

export async function getTasksByUserId(userId: number) {
    return await findTasksByUserId(userId);
}

export async function createTaskService(title: string, description: string, due_date: string, status: string, userId: number) {
    return await createTask(title, description, due_date, status, userId);
}
export async function getTaskByIdService(taskId: number, userId: number) {
    const task = await findTaskByIdAndUserId(taskId, userId);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }

    return task;
}
export async function updateTaskService(taskId: number, userId: number, title: string, description: string, due_date: string, status: string) {
    const task = await updateTaskByIdAndUserId(taskId, userId, title, description, due_date, status);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }
    return task;

}

export async function deleteTaskService(taskId: number, userId: number) {
    const task = await deleteTaskByIdAndUserId(taskId, userId);
    if (task === undefined) {
        throw new AppError("Task not found", 404);
    }
    return task;
}