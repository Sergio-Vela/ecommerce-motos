import { Pedido } from "../models/pedidoModel";
import { DetallePedido } from "../models/detallePedidoModel";
import type { PedidoService } from "../../domain/services/pedidoService";
import type { PedidoCreateData, PedidoUpdateData } from "../../application/dtos/pedidoDto";

export class PedidoServiceImpl implements PedidoService {
    async createPedido(data: PedidoCreateData): Promise<Pedido> {
        return await Pedido.create(data);
    }

    async getPedidos(): Promise<Pedido[]> {
        return await Pedido.findAll({
            include: ['usuario', 'estado', { model: DetallePedido, as: 'detalles', include: ['producto'] }]
        });
    }

    async getLatestPedido(): Promise<Pedido | null> {
        return await Pedido.findOne({
            order: [['fecha_pedido', 'DESC']],
            include: ['usuario', 'estado', { model: DetallePedido, as: 'detalles', include: ['producto'] }]
        });
    }

    async getPedidoById(id: number): Promise<Pedido | null> {
        return await Pedido.findByPk(id, {
            include: ['usuario', 'estado', { model: DetallePedido, as: 'detalles', include: ['producto'] }]
        });
    }

    async updatePedido(id: number, data: PedidoUpdateData): Promise<Pedido | null> {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return null;
        await pedido.update(data);
        return pedido;
    }

    async deletePedido(id: number): Promise<boolean> {
        const deleted = await Pedido.destroy({ where: { id } });
        return deleted > 0;
    }
}
