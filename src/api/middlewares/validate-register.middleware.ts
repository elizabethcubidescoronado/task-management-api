import { Request, Response, NextFunction } from "express";

/**
 * Valida nombre, correo y contrasena de al menos ocho caracteres.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Respuesta de error o undefined al continuar la peticion.
 */
export function validateRegister(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    } if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    next();
}