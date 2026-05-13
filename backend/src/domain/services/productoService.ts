import { Producto } from "../../infrastructure/models/productomodel";
import { ProductoCreateData, ProductoUpdateData } from "../../application/dtos/productoDto";

export interface ProductoService {
    createProducto(data: ProductoCreateData): Promise<Producto>;
    getProductos(): Promise<Producto[]>;
    getProductoById(id: number): Promise<Producto | null>;
    updateProducto(id: number, data: ProductoUpdateData): Promise<Producto | null>;
    deleteProducto(id: number): Promise<boolean>;
}