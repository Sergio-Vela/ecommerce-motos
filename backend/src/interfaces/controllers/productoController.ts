import { Request, Response } from "express";
import { ProductoServiceImpl } from "../../infrastructure/services/productoServiceImpl";
import { ProductoCreateData, ProductoUpdateData } from "../../application/dtos/productoDto";

const productoService = new ProductoServiceImpl();

export class ProductoController {
    async createProducto(req: Request, res: Response) {
        const data: ProductoCreateData = req.body;
        try {
            const producto = await productoService.createProducto(data);
            res.status(201).json(producto);
        } catch (error) {
            console.error("Error creating producto: ", error);
            res.status(500).json({ error: "Failed to create producto" });
        }
    }

    async getProductos(req: Request, res: Response) {
        try {
            const productos = await productoService.getProductos();
            res.status(200).json(productos);
        } catch (error) {
            console.error("Error fetching productos: ", error);
            res.status(500).json({ error: "Failed to fetch productos" });
        }
    }

    async getProductoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const producto = await productoService.getProductoById(Number(id));
            if (!producto) {
                res.status(404).json({ error: "Producto not found" });
            } else {
                res.status(200).json(producto);
            }
        } catch (error) {
            console.error("Error fetching producto: ", error);
            res.status(500).json({ error: "Failed to fetch producto" });
        }
    }

    async updateProducto(req: Request, res: Response) {
        const { id } = req.params;
        const data: ProductoUpdateData = req.body;
        try {
            const producto = await productoService.updateProducto(Number(id), data);
            if (!producto) {
                res.status(404).json({ error: "Producto not found" });
            } else {
                res.status(200).json(producto);
            }
        } catch (error) {
            console.error("Error updating producto: ", error);
            res.status(500).json({ error: "Failed to update producto" });
        }
    }

    async deleteProducto(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await productoService.deleteProducto(Number(id));
            if (success) {
                res.status(200).json({ message: "Producto deleted successfully" });
            } else {
                res.status(404).json({ error: "Producto not found" });
            }
        } catch (error) {
            console.error("Error deleting producto: ", error);
            res.status(500).json({ error: "Failed to delete producto" });
        }
    }
}