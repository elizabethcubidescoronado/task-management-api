import type { AuthenticatedUser } from "../../types/auth";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";

/**
 * Verifica el JWT Bearer, asigna la identidad a la peticion o responde 401.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Respuesta de error o undefined al continuar la peticion.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    } if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Invalid authorization  format" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        if (
            typeof decoded === "string" ||
            typeof decoded.id !== "number" ||
            !Number.isInteger(decoded.id) ||
            typeof decoded.email !== "string"
        ) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        const user: AuthenticatedUser = { id: decoded.id, email: decoded.email };
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

};