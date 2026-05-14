export interface PedidoProductoDto {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
  subtotal: number;
}

export interface PedidoDto {
  id: number;
  fecha: string;
  estado: string;
  total: number;
  productos: PedidoProductoDto[];
}
