import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaController";

const categoriaController = new CategoriaController();

export const categoriaRoutes = Router();

categoriaRoutes.post("/categorias", (req, res) => categoriaController.createCategoria(req, res));
categoriaRoutes.get("/categorias", (req, res) => categoriaController.getCategorias(req, res));
categoriaRoutes.get("/categorias/:id", (req, res) => categoriaController.getCategoriaById(req, res));
categoriaRoutes.put("/categorias/:id", (req, res) => categoriaController.updateCategoria(req, res));
categoriaRoutes.delete("/categorias/:id", (req, res) => categoriaController.deleteCategoria(req, res));

export default categoriaRoutes;