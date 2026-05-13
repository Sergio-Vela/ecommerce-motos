import { Router } from "express";
import { CarritoController } from "../controllers/carritoController";
import { CarritoItemController } from "../controllers/carritoItemController";
import { authenticateToken } from "../../middleware/authMiddleware";

const carritoController = new CarritoController();
const carritoItemController = new CarritoItemController();

export const carritoRoutes = Router();

carritoRoutes.post("/carrito/agregar", authenticateToken, (req, res) => carritoController.addProducto(req, res));
carritoRoutes.get("/carrito", authenticateToken, (req, res) => carritoController.getActiveCarrito(req, res));
carritoRoutes.delete("/carrito/item", authenticateToken, (req, res) => carritoItemController.deleteCarritoItem(req, res));
carritoRoutes.delete("/carrito/item/:id", authenticateToken, (req, res) => carritoItemController.deleteCarritoItem(req, res));
carritoRoutes.put("/carrito/item", authenticateToken, (req, res) => carritoItemController.updateCarritoItemQuantity(req, res));

carritoRoutes.post("/carritos", (req, res) => carritoController.createCarrito(req, res));
carritoRoutes.get("/carritos", (req, res) => carritoController.getCarritos(req, res));
carritoRoutes.get("/carritos/:id", (req, res) => carritoController.getCarritoById(req, res));
carritoRoutes.put("/carritos/:id", (req, res) => carritoController.updateCarrito(req, res));
carritoRoutes.delete("/carritos/:id", (req, res) => carritoController.deleteCarrito(req, res));

export default carritoRoutes;
