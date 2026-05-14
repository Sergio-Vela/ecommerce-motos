export interface DetallePedidoCreateData {
    pedido_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export interface DetallePedidoUpdateData {
    pedido_id?: number;
    producto_id?: number;
    cantidad?: number;
    precio_unitario?: number;
    subtotal?: number;
}
