import { Router } from "express";
import { DetallePedidoController } from "../controllers/detallePedidoController";

const detallePedidoController = new DetallePedidoController();

export const detallePedidoRoutes = Router();

detallePedidoRoutes.post("/detalles-pedidos", (req, res) => detallePedidoController.createDetallePedido(req, res));
detallePedidoRoutes.get("/detalles-pedidos", (req, res) => detallePedidoController.getDetallePedidos(req, res));
detallePedidoRoutes.get("/detalles-pedidos/:id", (req, res) => detallePedidoController.getDetallePedidoById(req, res));
detallePedidoRoutes.put("/detalles-pedidos/:id", (req, res) => detallePedidoController.updateDetallePedido(req, res));
detallePedidoRoutes.delete("/detalles-pedidos/:id", (req, res) => detallePedidoController.deleteDetallePedido(req, res));

export default detallePedidoRoutes;
