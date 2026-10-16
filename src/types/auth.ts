import type { Request } from "express";
import { AppError } from "../utils/app-error";

/** Identidad incluida en los JWT emitidos por la API. */
export interface AuthenticatedUser {
    id: number;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}

/**
 * Obtiene la identidad verificada previamente por authMiddleware.
 * @param req - Peticion protegida por el middleware de autenticacion.
 * @returns Identidad del usuario autenticado.
 * @throws {AppError} Con estado 401 si no hay una identidad verificada.
 */
export function getAuthenticatedUser(req: Request): AuthenticatedUser {
    if (!req.user) {
        throw new AppError("Authentication required", 401);
    }
    return req.user;
}
