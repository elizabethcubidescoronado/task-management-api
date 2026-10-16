import pool from "./database";


export async function findUserByEmail(email: string) {
    var result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

export async function createUser(name: string, email: string, password_hash: string) {
    return await pool.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", [name, email, password_hash]);
}
