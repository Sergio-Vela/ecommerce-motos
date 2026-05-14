import { Router } from "express";
import { CarritoItemController } from "../controllers/carritoItemController";

const carritoItemController = new CarritoItemController();

export const carritoItemRoutes = Router();

carritoItemRoutes.post("/carrito-items", (req, res) => carritoItemController.createCarritoItem(req, res));
carritoItemRoutes.get("/carrito-items", (req, res) => carritoItemController.getCarritoItems(req, res));
carritoItemRoutes.get("/carrito-items/:id", (req, res) => carritoItemController.getCarritoItemById(req, res));
carritoItemRoutes.put("/carrito-items/:id", (req, res) => carritoItemController.updateCarritoItem(req, res));
carritoItemRoutes.delete("/carrito-items/:id", (req, res) => carritoItemController.deleteCarritoItem(req, res));

export default carritoItemRoutes;
