export interface CarritoProductoDto {
  nombre: string;
  precio: number;
  imagenUrl: string;
}

export interface CarritoItemDto {
  id: number;
  cantidad: number;
  subtotal: number;
  producto: CarritoProductoDto;
}

export interface CarritoDto {
  items: CarritoItemDto[];
  total: number;
}
