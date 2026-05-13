import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";
import { CarritoServiceImpl } from "../../infrastructure/services/carritoServiceImpl";
import { DetallePedidoServiceImpl } from "../../infrastructure/services/detallePedidoServiceImpl";
import { PedidoServiceImpl } from "../../infrastructure/services/pedidoServiceImpl";
import { Estado } from "../../infrastructure/models/estadomodel";
import { PedidoCreateData, PedidoUpdateData } from "../../application/dtos/pedidoDto";

const pedidoService = new PedidoServiceImpl();
const carritoService = new CarritoServiceImpl();
const detallePedidoService = new DetallePedidoServiceImpl();

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

    async checkoutPedido(req: Request, res: Response) {
        const authReq = req as AuthenticatedRequest;
        const usuarioId = authReq.userId;
        if (!usuarioId) {
            return res.status(401).json({ error: "Usuario no autorizado" });
        }

        try {
            const carrito = await carritoService.getActiveCarritoByUsuario(usuarioId);
            if (!carrito || !carrito.items || carrito.items.length === 0) {
                return res.status(400).json({ error: "El carrito está vacío" });
            }

            const total = carrito.items.reduce((sum, item) => sum + Number(item.subtotal), 0);
            const direccionEnvio = carrito.usuario?.direccion || req.body.direccion || "Dirección no disponible";
            const [estadoPedido] = await Estado.findOrCreate({
                where: { nombre: 'en proceso' },
                defaults: { detalle: 'Pedido en proceso' }
            });

            const pedido = await pedidoService.createPedido({
                usuario_id: usuarioId,
                total,
                estado_id: estadoPedido.id,
                direccion_envio: direccionEnvio,
                fecha_pedido: new Date()
            });

            for (const item of carrito.items) {
                await detallePedidoService.createDetallePedido({
                    pedido_id: pedido.id,
                    producto_id: item.producto_id,
                    cantidad: item.cantidad,
                    precio_unitario: Number(item.precio_unitario),
                    subtotal: Number(item.subtotal)
                });
            }

            const [estadoCarritoCompletado] = await Estado.findOrCreate({
                where: { nombre: 'completado' },
                defaults: { detalle: 'Carrito completado' }
            });
            await carrito.update({ estadoId: estadoCarritoCompletado.id });

            const createdPedido = await pedidoService.getPedidoById(pedido.id);
            res.status(201).json(createdPedido);
        } catch (error) {
            console.error("Error al crear pedido desde carrito:", error);
            res.status(500).json({ error: "Failed to create pedido from cart" });
        }
    }

    async getLatestPedido(req: Request, res: Response) {
        try {
            const pedido = await pedidoService.getLatestPedido();
            if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
            res.status(200).json(pedido);
        } catch (error) {
            console.error("Error fetching latest pedido:", error);
            res.status(500).json({ error: "Failed to fetch latest pedido" });
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
