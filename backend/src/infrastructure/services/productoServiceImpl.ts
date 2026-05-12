import { Producto } from "../models/productomodel";
import type { ProductoService } from "../../domain/services/productoService";
import type { ProductoCreateData, ProductoUpdateData } from "../../application/dtos/productoDto";

export class ProductoServiceImpl implements ProductoService {
    async createProducto(data: ProductoCreateData): Promise<Producto> {
        return await Producto.create(data);
    }

    async getProductos(): Promise<Producto[]> {
        return await Producto.findAll({
            include: ['categoria', 'marca', 'talla', 'color', 'estado']
        });
    }

    async getProductoById(id: number): Promise<Producto | null> {
        return await Producto.findByPk(id, {
            include: ['categoria', 'marca', 'talla', 'color', 'estado']
        });
    }

    async updateProducto(id: number, data: ProductoUpdateData): Promise<Producto | null> {
        const producto = await Producto.findByPk(id);
        if (!producto) return null;
        await producto.update(data);
        return producto;
    }

    async deleteProducto(id: number): Promise<boolean> {
        const deleted = await Producto.destroy({ where: { id } });
        return deleted > 0;
    }
}