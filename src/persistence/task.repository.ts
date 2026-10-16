import  pool from "./database";

/**
 * Lista las tareas filtrando por su propietario.
 * @param userId - Identificador del propietario.
 * @returns Lista de tareas; vacia si el usuario no tiene tareas.
 */
export async function findTasksByUserId(userId: number) {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
    return result.rows;
}
    
/**
 * Crea una tarea para su propietario.
 * @param title - Titulo de la tarea.
 * @param description - Descripcion de la tarea.
 * @param due_date - Fecha limite en formato YYYY-MM-DD.
 * @param status - Estado validado por el esquema de tareas.
 * @param userId - Identificador del propietario.
 * @returns Tarea creada, consultada, actualizada o eliminada segun la operacion.
 */
export async function createTask(title: string, description: string, due_date: string, status: string, userId: number) { 
    const result = await pool.query(
        "INSERT INTO tasks (title, description, due_date, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, due_date, status, userId]
    );
    return result.rows[0];
}

/**
 * Busca una tarea filtrando por ID y propietario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @returns Fila encontrada o undefined si no existe una coincidencia.
 */
export async function findTaskByIdAndUserId(taskId: number, userId: number) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);
    return result.rows[0];
}

/**
 * Actualiza una tarea filtrando por ID y propietario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @param title - Titulo de la tarea.
 * @param description - Descripcion de la tarea.
 * @param due_date - Fecha limite en formato YYYY-MM-DD.
 * @param status - Estado validado por el esquema de tareas.
 * @returns Fila encontrada o undefined si no existe una coincidencia.
 */
export async function updateTaskByIdAndUserId(taskId: number, userId: number, title: string, description: string, due_date: string, status: string) {
    const result = await pool.query(
        "UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
        [title, description, due_date, status, taskId, userId]
    );
    return result.rows[0];

}
/**
 * Elimina una tarea filtrando por ID y propietario.
 * @param taskId - Identificador de la tarea.
 * @param userId - Identificador del propietario.
 * @returns Fila encontrada o undefined si no existe una coincidencia.
 */
export async function deleteTaskByIdAndUserId(taskId: number, userId: number) {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [taskId, userId]);
    return result.rows[0];
}