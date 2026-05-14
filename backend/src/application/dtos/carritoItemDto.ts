export interface CarritoItemCreateData {
    carrito_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

export interface CarritoItemUpdateData {
    carrito_id?: number;
    producto_id?: number;
    cantidad?: number;
    precio_unitario?: number;
    subtotal?: number;
}
