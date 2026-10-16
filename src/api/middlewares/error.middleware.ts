import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
 const statusCode = err instanceof AppError ?   err.statusCode : 500;
 res.status(statusCode).json({
  message: err.message,
  stack: process.env.NODE_ENV === "production" ? null : err.stack,
 });
}