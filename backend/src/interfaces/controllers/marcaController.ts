import { Request, Response } from "express";
import { MarcaServiceImpl } from "../../infrastructure/services/marcaServiceImpl";
import { MarcaCreateData, MarcaUpdateData } from "../../application/dtos/marcaDto";

const marcaService = new MarcaServiceImpl();

export class MarcaController {
    async createMarca(req: Request, res: Response) {
        const data: MarcaCreateData = req.body;
        try {
            const marca = await marcaService.createMarca(data);
            res.status(201).json(marca);
        } catch (error) {
            console.error("Error creating marca: ", error);
            res.status(500).json({ error: "Failed to create marca" });
        }
    }

    async getMarcas(req: Request, res: Response) {
        try {
            const marcas = await marcaService.getMarcas();
            res.status(200).json(marcas);
        } catch (error) {
            console.error("Error fetching marcas: ", error);
            res.status(500).json({ error: "Failed to fetch marcas" });
        }
    }

    async getMarcaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const marca = await marcaService.getMarcaById(Number(id));
            if (!marca) {
                res.status(404).json({ error: "Marca not found" });
            } else {
                res.status(200).json(marca);
            }
        } catch (error) {
            console.error("Error fetching marca: ", error);
            res.status(500).json({ error: "Failed to fetch marca" });
        }
    }

    async updateMarca(req: Request, res: Response) {
        const { id } = req.params;
        const data: MarcaUpdateData = req.body;
        try {
            const marca = await marcaService.updateMarca(Number(id), data);
            if (!marca) {
                res.status(404).json({ error: "Marca not found" });
            } else {
                res.status(200).json(marca);
            }
        } catch (error) {
            console.error("Error updating marca: ", error);
            res.status(500).json({ error: "Failed to update marca" });
        }
    }

    async deleteMarca(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await marcaService.deleteMarca(Number(id));
            if (success) {
                res.status(200).json({ message: "Marca deleted successfully" });
            } else {
                res.status(404).json({ error: "Marca not found" });
            }
        } catch (error) {
            console.error("Error deleting marca: ", error);
            res.status(500).json({ error: "Failed to delete marca" });
        }
    }
}