import pool from "./database";


/**
 * Busca un usuario por correo, incluido el hash usado para autenticarlo.
 * @param email - Correo del usuario.
 * @returns Fila encontrada o undefined si no existe una coincidencia.
 */
export async function findUserByEmail(email: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

/**
 * Inserta un usuario con su contrasena previamente cifrada.
 * @param name - Nombre del usuario.
 * @param email - Correo del usuario.
 * @param password_hash - Hash bcrypt de la contrasena.
 * @returns Resultado de insercion en PostgreSQL.
 */
export async function createUser(name: string, email: string, password_hash: string) {
    return await pool.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", [name, email, password_hash]);
}
