import { Request, Response } from "express";
import { PedidoServiceImpl } from "../../infrastructure/services/pedidoServiceImpl";
import { PedidoCreateData, PedidoUpdateData } from "../../application/dtos/pedidoDto";

const pedidoService = new PedidoServiceImpl();

export class PedidoController {
    async createPedido(req: Request, res: Response) {
        const data: PedidoCreateData = req.body;
        try {
            const pedido = await pedidoService.createPedido(data);
            res.status(201).json(pedido);
        } catch (error) {
            console.error("Error creating pedido:", error);
            res.status(500).json({ error: "Failed to create pedido" });
        }
    }

    async getPedidos(req: Request, res: Response) {
        try {
            const pedidos = await pedidoService.getPedidos();
            res.status(200).json(pedidos);
        } catch (error) {
            console.error("Error fetching pedidos:", error);
            res.status(500).json({ error: "Failed to fetch pedidos" });
        }
    }

    async getPedidoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const pedido = await pedidoService.getPedidoById(Number(id));
            if (!pedido) return res.status(404).json({ error: "Pedido not found" });
            res.status(200).json(pedido);
        } catch (error) {
            console.error("Error fetching pedido:", error);
            res.status(500).json({ error: "Failed to fetch pedido" });
        }
    }

    async updatePedido(req: Request, res: Response) {
        const { id } = req.params;
        const data: PedidoUpdateData = req.body;
        try {
            const pedido = await pedidoService.updatePedido(Number(id), data);
            if (!pedido) return res.status(404).json({ error: "Pedido not found" });
            res.status(200).json(pedido);
        } catch (error) {
            console.error("Error updating pedido:", error);
            res.status(500).json({ error: "Failed to update pedido" });
        }
    }

    async deletePedido(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deleted = await pedidoService.deletePedido(Number(id));
            if (!deleted) return res.status(404).json({ error: "Pedido not found" });
            res.status(200).json({ message: "Pedido deleted successfully" });
        } catch (error) {
            console.error("Error deleting pedido:", error);
            res.status(500).json({ error: "Failed to delete pedido" });
        }
    }
}
