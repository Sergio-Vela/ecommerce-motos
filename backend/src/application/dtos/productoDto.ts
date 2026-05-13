export interface ProductoCreateData {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoriaId: number;
    marcaId: number;
    tallaId: number;
    colorId: number;
    imagenUrl?: string;
    estadoId: number;
}

export interface ProductoUpdateData {
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    categoriaId?: number;
    marcaId?: number;
    tallaId?: number;
    colorId?: number;
    imagenUrl?: string;
    estadoId?: number;
}