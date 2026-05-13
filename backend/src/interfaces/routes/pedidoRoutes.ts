import { Router } from "express";
import { PedidoController } from "../controllers/pedidoController";
import { authenticateToken } from "../../middleware/authMiddleware";

const pedidoController = new PedidoController();

export const pedidoRoutes = Router();

pedidoRoutes.post("/pedidos", (req, res) => pedidoController.createPedido(req, res));
pedidoRoutes.post("/pedidos/checkout", authenticateToken, (req, res) => pedidoController.checkoutPedido(req, res));
pedidoRoutes.get("/pedidos/latest", (req, res) => pedidoController.getLatestPedido(req, res));
pedidoRoutes.get("/pedidos", (req, res) => pedidoController.getPedidos(req, res));
pedidoRoutes.get("/pedidos/:id", (req, res) => pedidoController.getPedidoById(req, res));
pedidoRoutes.put("/pedidos/:id", (req, res) => pedidoController.updatePedido(req, res));
pedidoRoutes.delete("/pedidos/:id", (req, res) => pedidoController.deletePedido(req, res));

export default pedidoRoutes;
