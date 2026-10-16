import  pool from "./database";

export async function findTasksByUserId(userId: number) {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [userId]);
    return result.rows;
}
    
export async function createTask(title: string, description: string, due_date: string, status: string, userId: number) { 
    const result = await pool.query(
        "INSERT INTO tasks (title, description, due_date, status, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, due_date, status, userId]
    );
    return result.rows[0];
}

export async function findTaskByIdAndUserId(taskId: number, userId: number) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);
    return result.rows[0];
}

export async function updateTaskByIdAndUserId(taskId: number, userId: number, title: string, description: string, due_date: string, status: string) {
    const result = await pool.query(
        "UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
        [title, description, due_date, status, taskId, userId]
    );
    return result.rows[0];

}
export async function deleteTaskByIdAndUserId(taskId: number, userId: number) {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [taskId, userId]);
    return result.rows[0];
}