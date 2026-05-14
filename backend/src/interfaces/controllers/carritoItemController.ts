import { Request, Response } from "express";
import { CarritoItemServiceImpl } from "../../infrastructure/services/carritoItemServiceImpl";
import { CarritoItemCreateData, CarritoItemUpdateData } from "../../application/dtos/carritoItemDto";

const carritoItemService = new CarritoItemServiceImpl();

export class CarritoItemController {
    async createCarritoItem(req: Request, res: Response) {
        const data: CarritoItemCreateData = req.body;
        try {
            const carritoItem = await carritoItemService.createCarritoItem(data);
            res.status(201).json(carritoItem);
        } catch (error) {
            console.error("Error creating carrito item:", error);
            res.status(500).json({ error: "Failed to create carrito item" });
        }
    }

    async getCarritoItems(req: Request, res: Response) {
        try {
            const items = await carritoItemService.getCarritoItems();
            res.status(200).json(items);
        } catch (error) {
            console.error("Error fetching carrito items:", error);
            res.status(500).json({ error: "Failed to fetch carrito items" });
        }
    }

    async getCarritoItemById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const item = await carritoItemService.getCarritoItemById(Number(id));
            if (!item) return res.status(404).json({ error: "Carrito item not found" });
            res.status(200).json(item);
        } catch (error) {
            console.error("Error fetching carrito item:", error);
            res.status(500).json({ error: "Failed to fetch carrito item" });
        }
    }

    async updateCarritoItem(req: Request, res: Response) {
        const { id } = req.params;
        const data: CarritoItemUpdateData = req.body;
        try {
            const item = await carritoItemService.updateCarritoItem(Number(id), data);
            if (!item) return res.status(404).json({ error: "Carrito item not found" });
            res.status(200).json(item);
        } catch (error) {
            console.error("Error updating carrito item:", error);
            res.status(500).json({ error: "Failed to update carrito item" });
        }
    }

    async deleteCarritoItem(req: Request, res: Response) {
        const itemId = Number(req.params.id ?? req.body.itemId ?? req.query.itemId);
        if (!itemId || Number.isNaN(itemId)) return res.status(400).json({ error: "itemId is required" });

        try {
            const deleted = await carritoItemService.deleteCarritoItemById(itemId);
            if (!deleted) return res.status(404).json({ error: "Carrito item not found" });
            res.status(200).json({ message: "Carrito item deleted successfully" });
        } catch (error) {
            console.error("Error deleting carrito item:", error);
            res.status(500).json({ error: "Failed to delete carrito item" });
        }
    }

    async updateCarritoItemQuantity(req: Request, res: Response) {
        const itemId = Number(req.body.itemId);
        const cantidad = Number(req.body.cantidad);
        if (!itemId || !cantidad) return res.status(400).json({ error: "itemId and cantidad are required" });

        try {
            const item = await carritoItemService.updateCarritoItemQuantity(itemId, cantidad);
            if (!item) return res.status(404).json({ error: "Carrito item not found" });
            res.status(200).json(item);
        } catch (error) {
            console.error("Error updating carrito item quantity:", error);
            res.status(500).json({ error: error instanceof Error ? error.message : "Failed to update carrito item quantity" });
        }
    }
}
