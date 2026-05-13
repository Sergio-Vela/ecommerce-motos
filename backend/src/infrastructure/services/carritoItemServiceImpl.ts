import { CarritoItems } from "../models/carritoItemModel";
import { Producto } from "../models/productomodel";
import type { CarritoItemService } from "../../domain/services/carritoItemService";
import type { CarritoItemCreateData, CarritoItemUpdateData } from "../../application/dtos/carritoItemDto";

export class CarritoItemServiceImpl implements CarritoItemService {
    async createCarritoItem(data: CarritoItemCreateData): Promise<CarritoItems> {
        return await CarritoItems.create(data);
    }

    async getCarritoItems(): Promise<CarritoItems[]> {
        return await CarritoItems.findAll({
            include: ['carrito', 'producto']
        });
    }

    async getCarritoItemById(id: number): Promise<CarritoItems | null> {
        return await CarritoItems.findByPk(id, {
            include: ['carrito', 'producto']
        });
    }

    async updateCarritoItem(id: number, data: CarritoItemUpdateData): Promise<CarritoItems | null> {
        const carritoItem = await CarritoItems.findByPk(id);
        if (!carritoItem) return null;
        await carritoItem.update(data);
        return carritoItem;
    }

    async updateCarritoItemQuantity(id: number, cantidad: number): Promise<CarritoItems | null> {
        const carritoItem = await CarritoItems.findByPk(id);
        if (!carritoItem) return null;

        if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a cero');

        const producto = await Producto.findByPk(carritoItem.producto_id);
        if (!producto) throw new Error('Producto no encontrado');

        const stockDisponible = Number(producto.get('stock'));
        if (cantidad > stockDisponible) throw new Error('Stock insuficiente para la cantidad solicitada');

        const precioUnitario = Number(carritoItem.get('precio_unitario')) || Number(producto.get('precio'));
        const subtotal = precioUnitario * cantidad;

        await carritoItem.update({ cantidad, subtotal, precio_unitario: precioUnitario });
        return carritoItem;
    }

    async deleteCarritoItemById(id: number): Promise<boolean> {
        const deleted = await CarritoItems.destroy({ where: { id } });
        return deleted > 0;
    }
}
