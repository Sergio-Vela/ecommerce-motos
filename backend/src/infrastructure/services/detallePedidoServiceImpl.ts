import { DetallePedido } from "../models/detallePedidoModel";
import type { DetallePedidoService } from "../../domain/services/detallePedidoService";
import type { DetallePedidoCreateData, DetallePedidoUpdateData } from "../../application/dtos/detallePedidoDto";

export class DetallePedidoServiceImpl implements DetallePedidoService {
    async createDetallePedido(data: DetallePedidoCreateData): Promise<DetallePedido> {
        return await DetallePedido.create(data);
    }

    async getDetallePedidos(): Promise<DetallePedido[]> {
        return await DetallePedido.findAll({
            include: ['pedido', 'producto']
        });
    }

    async getDetallePedidoById(id: number): Promise<DetallePedido | null> {
        return await DetallePedido.findByPk(id, {
            include: ['pedido', 'producto']
        });
    }

    async updateDetallePedido(id: number, data: DetallePedidoUpdateData): Promise<DetallePedido | null> {
        const detallePedido = await DetallePedido.findByPk(id);
        if (!detallePedido) return null;
        await detallePedido.update(data);
        return detallePedido;
    }

    async deleteDetallePedido(id: number): Promise<boolean> {
        const deleted = await DetallePedido.destroy({ where: { id } });
        return deleted > 0;
    }
}
