export interface PedidoCreateData {
    usuario_id: number;
    total: number;
    estado_id: number;
    direccion_envio: string;
    fecha_pedido: Date;
}

export interface PedidoUpdateData {
    usuario_id?: number;
    total?: number;
    estado_id?: number;
    direccion_envio?: string;
    fecha_pedido?: Date;
}
