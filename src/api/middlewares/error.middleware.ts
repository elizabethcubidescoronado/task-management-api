import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";

/**
 * Traduce AppError a su estado HTTP, usa 500 para otros errores y oculta la traza en produccion.
 * @param err - Error capturado; AppError incluye el estado HTTP.
 * @param _req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param _next - Continua la cadena o delega el error al middleware central.
 * @returns Nada; envia la respuesta de error.
 */
export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}
