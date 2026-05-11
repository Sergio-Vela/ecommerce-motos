import { Router } from "express";
import { EstadoController } from "../controllers/estadoController";

const estadoController = new EstadoController();

export const estadoRoutes = Router();

estadoRoutes.post("/estados", (req, res) => estadoController.createEstado(req, res));
estadoRoutes.get("/estados", (req, res) => estadoController.getEstados(req, res));
estadoRoutes.get("/estados/:id", (req, res) => estadoController.getEstadoById(req, res));
estadoRoutes.put("/estados/:id", (req, res) => estadoController.updateEstado(req, res));
estadoRoutes.delete("/estados/:id", (req, res) => estadoController.deleteEstado(req, res));

export default estadoRoutes;
