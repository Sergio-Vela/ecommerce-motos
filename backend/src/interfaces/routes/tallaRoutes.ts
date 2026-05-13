import { Router } from "express";
import { TallaController } from "../controllers/tallaController";

const tallaController = new TallaController();

export const tallaRoutes = Router();

tallaRoutes.post("/tallas", (req, res) => tallaController.createTalla(req, res));
tallaRoutes.get("/tallas", (req, res) => tallaController.getTallas(req, res));
tallaRoutes.get("/tallas/:id", (req, res) => tallaController.getTallaById(req, res));
tallaRoutes.put("/tallas/:id", (req, res) => tallaController.updateTalla(req, res));
tallaRoutes.delete("/tallas/:id", (req, res) => tallaController.deleteTalla(req, res));

export default tallaRoutes;