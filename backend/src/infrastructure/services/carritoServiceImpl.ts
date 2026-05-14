import { Carrito } from "../models/carritoModel";
import { CarritoItems } from "../models/carritoItemModel";
import { Producto } from "../models/productomodel";
import { Estado } from "../models/estadomodel";
import type { CarritoService } from "../../domain/services/carritoService";
import type { CarritoCreateData, CarritoUpdateData, CarritoAddProductData } from "../../application/dtos/carritoDto";

export class CarritoServiceImpl implements CarritoService {
    async createCarrito(data: CarritoCreateData): Promise<Carrito> {
        return await Carrito.create(data);
    }

    async getCarritos(): Promise<Carrito[]> {
        return await Carrito.findAll({
            include: ['usuario', 'estado', { model: CarritoItems, as: 'items', include: ['producto'] }]
        });
    }

    async getCarritoById(id: number): Promise<Carrito | null> {
        return await Carrito.findByPk(id, {
            include: ['usuario', 'estado', { model: CarritoItems, as: 'items', include: ['producto'] }]
        });
    }

    private async getEstadoActivo(): Promise<Estado> {
        const [estadoActivo] = await Estado.findOrCreate({
            where: { nombre: 'activo' },
            defaults: { detalle: 'Carrito activo' }
        });
        return estadoActivo;
    }

    async getActiveCarritoByUsuario(usuarioId: number): Promise<Carrito | null> {
        const estadoActivo = await this.getEstadoActivo();

        return await Carrito.findOne({
            where: { usuarioId, estadoId: estadoActivo.id },
            include: ['usuario', 'estado', { model: CarritoItems, as: 'items', include: ['producto'] }]
        });
    }

    async addProductoToCarrito(data: CarritoAddProductData): Promise<Carrito> {
        const { usuarioId, productoId, cantidad } = data;
        if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a cero');

        const producto = await Producto.findByPk(productoId);
        if (!producto) throw new Error('Producto no encontrado');

        const precioUnitario = Number(producto.get('precio'));
        const stockDisponible = Number(producto.get('stock'));
        if (cantidad > stockDisponible) throw new Error('Stock insuficiente');

        const estadoActivo = await this.getEstadoActivo();

        let carrito = await Carrito.findOne({ where: { usuarioId, estadoId: estadoActivo.id } });
        if (!carrito) {
            carrito = await Carrito.create({ usuarioId, estadoId: estadoActivo.id });
        }

        const carritoItem = await CarritoItems.findOne({
            where: { carrito_id: carrito.id, producto_id: productoId }
        });

        if (carritoItem) {
            const nuevaCantidad = carritoItem.cantidad + cantidad;
            if (nuevaCantidad > stockDisponible) throw new Error('Stock insuficiente para la cantidad solicitada');

            const subtotal = precioUnitario * nuevaCantidad;
            await carritoItem.update({
                cantidad: nuevaCantidad,
                precio_unitario: precioUnitario,
                subtotal,
            });
        } else {
            const subtotal = precioUnitario * cantidad;
            await CarritoItems.create({
                carrito_id: carrito.id,
                producto_id: productoId,
                cantidad,
                precio_unitario: precioUnitario,
                subtotal,
            });
        }

        const carritoActualizado = await this.getActiveCarritoByUsuario(usuarioId);
        if (!carritoActualizado) throw new Error('Error al obtener el carrito activo');
        return carritoActualizado;
    }

    async updateCarrito(id: number, data: CarritoUpdateData): Promise<Carrito | null> {
        const carrito = await Carrito.findByPk(id);
        if (!carrito) return null;
        await carrito.update(data);
        return carrito;
    }

    async deleteCarrito(id: number): Promise<boolean> {
        const deleted = await Carrito.destroy({ where: { id } });
        return deleted > 0;
    }
}
