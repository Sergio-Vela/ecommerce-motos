import { Pedido } from "../../infrastructure/models/pedidoModel";
import { PedidoCreateData, PedidoUpdateData } from "../../application/dtos/pedidoDto";

export interface PedidoService {
    createPedido(data: PedidoCreateData): Promise<Pedido>;
    getPedidos(): Promise<Pedido[]>;
    getPedidoById(id: number): Promise<Pedido | null>;
    updatePedido(id: number, data: PedidoUpdateData): Promise<Pedido | null>;
    deletePedido(id: number): Promise<boolean>;
}
