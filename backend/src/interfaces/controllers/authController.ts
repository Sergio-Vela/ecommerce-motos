import { Request, Response } from "express";
import { AuthServiceImpl } from "../../infrastructure/services/authServiceImpl";
import type { LoginData } from "../../application/dtos/authDto";

const authService = new AuthServiceImpl();

export class AuthController {
    async login(req: Request, res: Response) {
        const data: LoginData = req.body;
        try {
            const response = await authService.login(data);
            res.status(200).json(response);
        } catch (error) {
            console.error("Error in login:", error);
            res.status(401).json({ error: error instanceof Error ? error.message : "Login failed" });
        }
    }
}
