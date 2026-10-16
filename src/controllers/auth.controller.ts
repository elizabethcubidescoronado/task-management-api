import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";
import { loginUserService } from "../services/auth.service";

/**
 * Registra al usuario validado; responde 201 o 400 si el registro falla.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        const result = await registerUserService(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    };
}
/**
 * Inicia sesion; devuelve el JWT o responde 401 si las credenciales son incorrectas.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @returns Promesa que se resuelve al enviar la respuesta HTTP.
 */
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;   
    try {
        const result = await loginUserService(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : String(error) });
    }
}