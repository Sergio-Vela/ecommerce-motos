export interface CarritoCreateData {
    usuarioId: number;
    estadoId: number;
}

export interface CarritoUpdateData {
    usuarioId?: number;
    estadoId?: number;
}

export interface CarritoAddProductData {
    usuarioId: number;
    productoId: number;
    cantidad: number;
}
