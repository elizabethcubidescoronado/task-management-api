import { Request, Response, NextFunction } from "express";

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