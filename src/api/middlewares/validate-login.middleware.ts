import { Request, Response, NextFunction } from "express";

/**
 * Valida correo y contrasena; responde 400 si los datos no son validos.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Respuesta de error o undefined al continuar la peticion.
 */
export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
    next();
}