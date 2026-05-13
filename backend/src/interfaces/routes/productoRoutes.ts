import { Router } from "express";
import { ProductoController } from "../controllers/productoController";

const productoController = new ProductoController();

export const productoRoutes = Router();

productoRoutes.post("/productos", (req, res) => productoController.createProducto(req, res));
productoRoutes.get("/productos", (req, res) => productoController.getProductos(req, res));
productoRoutes.get("/productos/:id", (req, res) => productoController.getProductoById(req, res));
productoRoutes.put("/productos/:id", (req, res) => productoController.updateProducto(req, res));
productoRoutes.delete("/productos/:id", (req, res) => productoController.deleteProducto(req, res));

export default productoRoutes;