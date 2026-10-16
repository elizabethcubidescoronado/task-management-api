import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";
import { loginUserService } from "../services/auth.service";

export async function registerUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        const result = await registerUserService(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
    };
}
export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;   
    try {
        const result = await loginUserService(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : String(error) });
    }
}