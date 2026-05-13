import { Router } from "express";
import { ColorController } from "../controllers/colorController";

const colorController = new ColorController();

export const colorRoutes = Router();

colorRoutes.post("/colores", (req, res) => colorController.createColor(req, res));
colorRoutes.get("/colores", (req, res) => colorController.getColores(req, res));
colorRoutes.get("/colores/:id", (req, res) => colorController.getColorById(req, res));
colorRoutes.put("/colores/:id", (req, res) => colorController.updateColor(req, res));
colorRoutes.delete("/colores/:id", (req, res) => colorController.deleteColor(req, res));

export default colorRoutes;