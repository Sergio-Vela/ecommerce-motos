import { DetallePedido } from "../../infrastructure/models/detallePedidoModel";
import { DetallePedidoCreateData, DetallePedidoUpdateData } from "../../application/dtos/detallePedidoDto";

export interface DetallePedidoService {
    createDetallePedido(data: DetallePedidoCreateData): Promise<DetallePedido>;
    getDetallePedidos(): Promise<DetallePedido[]>;
    getDetallePedidoById(id: number): Promise<DetallePedido | null>;
    updateDetallePedido(id: number, data: DetallePedidoUpdateData): Promise<DetallePedido | null>;
    deleteDetallePedido(id: number): Promise<boolean>;
}
