export interface ProductoDto {
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoriaId: number;
    marcaId: number;
    tallaId: number;
    colorId: number;
    imagenUrl: string;
    estadoId: number;
}
