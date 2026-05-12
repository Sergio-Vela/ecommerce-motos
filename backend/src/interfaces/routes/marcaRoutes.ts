import { Router } from "express";
import { MarcaController } from "../controllers/marcaController";

const marcaController = new MarcaController();

export const marcaRoutes = Router();

marcaRoutes.post("/marcas", (req, res) => marcaController.createMarca(req, res));
marcaRoutes.get("/marcas", (req, res) => marcaController.getMarcas(req, res));
marcaRoutes.get("/marcas/:id", (req, res) => marcaController.getMarcaById(req, res));
marcaRoutes.put("/marcas/:id", (req, res) => marcaController.updateMarca(req, res));
marcaRoutes.delete("/marcas/:id", (req, res) => marcaController.deleteMarca(req, res));

export default marcaRoutes;