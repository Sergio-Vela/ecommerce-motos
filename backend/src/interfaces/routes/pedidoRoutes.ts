import { Router } from "express";
import { PedidoController } from "../controllers/pedidoController";

const pedidoController = new PedidoController();

export const pedidoRoutes = Router();

pedidoRoutes.post("/pedidos", (req, res) => pedidoController.createPedido(req, res));
pedidoRoutes.get("/pedidos", (req, res) => pedidoController.getPedidos(req, res));
pedidoRoutes.get("/pedidos/:id", (req, res) => pedidoController.getPedidoById(req, res));
pedidoRoutes.put("/pedidos/:id", (req, res) => pedidoController.updatePedido(req, res));
pedidoRoutes.delete("/pedidos/:id", (req, res) => pedidoController.deletePedido(req, res));

export default pedidoRoutes;
