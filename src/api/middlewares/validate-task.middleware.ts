import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import taskSchema from "../../schemas/task.schema";

const ajv = new Ajv();
addFormats(ajv);
const validateTaskSchema = ajv.compile(taskSchema);
/**
 * Valida el cuerpo con AJV y devuelve 400 con los errores si no cumple el esquema.
 * @param req - Peticion entrante; las tareas requieren autenticacion previa.
 * @param res - Respuesta HTTP.
 * @param next - Continua la cadena o delega el error al middleware central.
 * @returns Respuesta de error o undefined al continuar la peticion.
 */
export function validateTask(req: Request, res: Response, next: NextFunction) {
    if (!validateTaskSchema(req.body)) {
        return res.status(400).json({ message: "Invalid task data", errors: validateTaskSchema.errors });
    }
    next();
}