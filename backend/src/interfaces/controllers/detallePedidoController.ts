import { Request, Response } from "express";
import { DetallePedidoServiceImpl } from "../../infrastructure/services/detallePedidoServiceImpl";
import { DetallePedidoCreateData, DetallePedidoUpdateData } from "../../application/dtos/detallePedidoDto";

const detallePedidoService = new DetallePedidoServiceImpl();

export class DetallePedidoController {
    async createDetallePedido(req: Request, res: Response) {
        const data: DetallePedidoCreateData = req.body;
        try {
            const detallePedido = await detallePedidoService.createDetallePedido(data);
            res.status(201).json(detallePedido);
        } catch (error) {
            console.error("Error creating detalle pedido:", error);
            res.status(500).json({ error: "Failed to create detalle pedido" });
        }
    }

    async getDetallePedidos(req: Request, res: Response) {
        try {
            const detalles = await detallePedidoService.getDetallePedidos();
            res.status(200).json(detalles);
        } catch (error) {
            console.error("Error fetching detalle pedidos:", error);
            res.status(500).json({ error: "Failed to fetch detalle pedidos" });
        }
    }

    async getDetallePedidoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const detallePedido = await detallePedidoService.getDetallePedidoById(Number(id));
            if (!detallePedido) return res.status(404).json({ error: "Detalle pedido not found" });
            res.status(200).json(detallePedido);
        } catch (error) {
            console.error("Error fetching detalle pedido:", error);
            res.status(500).json({ error: "Failed to fetch detalle pedido" });
        }
    }

    async updateDetallePedido(req: Request, res: Response) {
        const { id } = req.params;
        const data: DetallePedidoUpdateData = req.body;
        try {
            const detallePedido = await detallePedidoService.updateDetallePedido(Number(id), data);
            if (!detallePedido) return res.status(404).json({ error: "Detalle pedido not found" });
            res.status(200).json(detallePedido);
        } catch (error) {
            console.error("Error updating detalle pedido:", error);
            res.status(500).json({ error: "Failed to update detalle pedido" });
        }
    }

    async deleteDetallePedido(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deleted = await detallePedidoService.deleteDetallePedido(Number(id));
            if (!deleted) return res.status(404).json({ error: "Detalle pedido not found" });
            res.status(200).json({ message: "Detalle pedido deleted successfully" });
        } catch (error) {
            console.error("Error deleting detalle pedido:", error);
            res.status(500).json({ error: "Failed to delete detalle pedido" });
        }
    }
}
