import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authController = new AuthController();
export const authRoutes = Router();

authRoutes.post("/auth/login", (req, res) => authController.login(req, res));

export default authRoutes;
