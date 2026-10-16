import { findUserByEmail } from "../persistence/user.repository";
import bcrypt from "bcrypt";
import { createUser }  from "../persistence/user.repository";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

/**
 * Comprueba que el correo sea unico y registra al usuario con un hash bcrypt.
 * @param name - Nombre del usuario.
 * @param email - Correo del usuario.
 * @param password - Contrasena validada, recibida en texto plano y nunca persistida directamente.
 * @returns Mensaje de registro exitoso.
 * @throws {Error} Si el correo ya esta registrado.
 */
export async function registerUserService(name: string, email: string, password: string) {
      const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const password_hash = await bcrypt.hash(password, 10);
    await createUser(name, email, password_hash);
    return { message: `User ${name} registered with email ${email}` };
}
/**
 * Compara la contrasena con bcrypt y emite un JWT valido durante una hora.
 * @param email - Correo del usuario.
 * @param password - Contrasena validada, recibida en texto plano y nunca persistida directamente.
 * @returns Mensaje de inicio de sesion y token JWT.
 * @throws {Error} Si las credenciales son incorrectas.
 */
export async function loginUserService(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: "1h" });
    return { message: "Login successful", token };
}
    