import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import taskSchema from "../../schemas/task.schema";

const ajv = new Ajv();
addFormats(ajv);
const validateTaskSchema = ajv.compile(taskSchema);
export function validateTask(req: Request, res: Response, next: NextFunction) {
    if (!validateTaskSchema(req.body)) {
        return res.status(400).json({ message: "Invalid task data", errors: validateTaskSchema.errors });
    }
    next();
}