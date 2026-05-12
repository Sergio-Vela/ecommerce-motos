import { Request, Response } from "express";
import { CategoriaServiceImpl } from "../../infrastructure/services/categoriaServiceImpl";
import { CategoriaCreateData, CategoriaUpdateData } from "../../application/dtos/categoriaDto";

const categoriaService = new CategoriaServiceImpl();

export class CategoriaController {
    async createCategoria(req: Request, res: Response) {
        const data: CategoriaCreateData = req.body;
        try {
            const categoria = await categoriaService.createCategoria(data);
            res.status(201).json(categoria);
        } catch (error) {
            console.error("Error creating categoria: ", error);
            res.status(500).json({ error: "Failed to create categoria" });
        }
    }

    async getCategorias(req: Request, res: Response) {
        try {
            const categorias = await categoriaService.getCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            console.error("Error fetching categorias: ", error);
            res.status(500).json({ error: "Failed to fetch categorias" });
        }
    }

    async getCategoriaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const categoria = await categoriaService.getCategoriaById(Number(id));
            if (!categoria) {
                res.status(404).json({ error: "Categoria not found" });
            } else {
                res.status(200).json(categoria);
            }
        } catch (error) {
            console.error("Error fetching categoria: ", error);
            res.status(500).json({ error: "Failed to fetch categoria" });
        }
    }

    async updateCategoria(req: Request, res: Response) {
        const { id } = req.params;
        const data: CategoriaUpdateData = req.body;
        try {
            const categoria = await categoriaService.updateCategoria(Number(id), data);
            if (!categoria) {
                res.status(404).json({ error: "Categoria not found" });
            } else {
                res.status(200).json(categoria);
            }
        } catch (error) {
            console.error("Error updating categoria: ", error);
            res.status(500).json({ error: "Failed to update categoria" });
        }
    }

    async deleteCategoria(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await categoriaService.deleteCategoria(Number(id));
            if (success) {
                res.status(200).json({ message: "Categoria deleted successfully" });
            } else {
                res.status(404).json({ error: "Categoria not found" });
            }
        } catch (error) {
            console.error("Error deleting categoria: ", error);
            res.status(500).json({ error: "Failed to delete categoria" });
        }
    }
}