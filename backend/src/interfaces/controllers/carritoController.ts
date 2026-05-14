import { Request, Response } from "express";
import { CarritoServiceImpl } from "../../infrastructure/services/carritoServiceImpl";
import { CarritoCreateData, CarritoUpdateData, CarritoAddProductData } from "../../application/dtos/carritoDto";
import { AuthenticatedRequest } from "../../middleware/authMiddleware";

const carritoService = new CarritoServiceImpl();

export class CarritoController {
    async createCarrito(req: Request, res: Response) {
        const data: CarritoCreateData = req.body;
        try {
            const carrito = await carritoService.createCarrito(data);
            res.status(201).json(carrito);
        } catch (error) {
            console.error("Error creating carrito:", error);
            res.status(500).json({ error: "Failed to create carrito" });
        }
    }

    async getCarritos(req: Request, res: Response) {
        try {
            const carritos = await carritoService.getCarritos();
            res.status(200).json(carritos);
        } catch (error) {
            console.error("Error fetching carritos:", error);
            res.status(500).json({ error: "Failed to fetch carritos" });
        }
    }

    async getActiveCarrito(req: AuthenticatedRequest, res: Response) {
        const usuarioId = req.userId;
        if (!usuarioId) return res.status(401).json({ error: "Usuario no autenticado" });

        try {
            const carrito = await carritoService.getActiveCarritoByUsuario(usuarioId);
            if (!carrito) return res.status(404).json({ error: "No active carrito found" });

            const carritoJson = carrito.toJSON() as any;
            const items = (carritoJson.items || []).map((item: any) => ({
                id: item.id,
                productoId: item.producto_id,
                cantidad: item.cantidad,
                precio_unitario: Number(item.precio_unitario),
                subtotal: Number(item.subtotal),
                producto: item.producto || null,
            }));
            const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);

            res.status(200).json({
                id: carritoJson.id,
                usuarioId: carritoJson.usuarioId,
                estadoId: carritoJson.estadoId,
                items,
                total,
            });
        } catch (error) {
            console.error("Error fetching active carrito:", error);
            res.status(500).json({ error: "Failed to fetch active carrito" });
        }
    }

    async addProducto(req: AuthenticatedRequest, res: Response) {
        const usuarioId = req.userId;
        if (!usuarioId) return res.status(401).json({ error: "Usuario no autenticado" });

        const data: CarritoAddProductData = {
            usuarioId,
            productoId: Number(req.body.productoId),
            cantidad: Number(req.body.cantidad),
        };

        if (!data.productoId || !data.cantidad) {
            return res.status(400).json({ error: "productoId and cantidad are required" });
        }

        try {
            const carrito = await carritoService.addProductoToCarrito(data);
            const carritoJson = carrito.toJSON() as any;
            const items = (carritoJson.items || []).map((item: any) => ({
                id: item.id,
                productoId: item.producto_id,
                cantidad: item.cantidad,
                precio_unitario: Number(item.precio_unitario),
                subtotal: Number(item.subtotal),
                producto: item.producto || null,
            }));
            const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);

            res.status(200).json({
                id: carritoJson.id,
                usuarioId: carritoJson.usuarioId,
                estadoId: carritoJson.estadoId,
                items,
                total,
            });
        } catch (error) {
            console.error("Error adding product to carrito:", error);
            res.status(500).json({ error: error instanceof Error ? error.message : "Failed to add product to carrito" });
        }
    }

    async getCarritoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const carrito = await carritoService.getCarritoById(Number(id));
            if (!carrito) return res.status(404).json({ error: "Carrito not found" });
            res.status(200).json(carrito);
        } catch (error) {
            console.error("Error fetching carrito:", error);
            res.status(500).json({ error: "Failed to fetch carrito" });
        }
    }

    async updateCarrito(req: Request, res: Response) {
        const { id } = req.params;
        const data: CarritoUpdateData = req.body;
        try {
            const carrito = await carritoService.updateCarrito(Number(id), data);
            if (!carrito) return res.status(404).json({ error: "Carrito not found" });
            res.status(200).json(carrito);
        } catch (error) {
            console.error("Error updating carrito:", error);
            res.status(500).json({ error: "Failed to update carrito" });
        }
    }

    async deleteCarrito(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deleted = await carritoService.deleteCarrito(Number(id));
            if (!deleted) return res.status(404).json({ error: "Carrito not found" });
            res.status(200).json({ message: "Carrito deleted successfully" });
        } catch (error) {
            console.error("Error deleting carrito:", error);
            res.status(500).json({ error: "Failed to delete carrito" });
        }
    }
}
