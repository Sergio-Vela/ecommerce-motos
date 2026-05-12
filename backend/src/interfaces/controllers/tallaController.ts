import { Request, Response } from "express";
import { TallaServiceImpl } from "../../infrastructure/services/tallaServiceImpl";
import { TallaCreateData, TallaUpdateData } from "../../application/dtos/tallaDto";

const tallaService = new TallaServiceImpl();

export class TallaController {
    async createTalla(req: Request, res: Response) {
        const data: TallaCreateData = req.body;
        try {
            const talla = await tallaService.createTalla(data);
            res.status(201).json(talla);
        } catch (error) {
            console.error("Error creating talla: ", error);
            res.status(500).json({ error: "Failed to create talla" });
        }
    }

    async getTallas(req: Request, res: Response) {
        try {
            const tallas = await tallaService.getTallas();
            res.status(200).json(tallas);
        } catch (error) {
            console.error("Error fetching tallas: ", error);
            res.status(500).json({ error: "Failed to fetch tallas" });
        }
    }

    async getTallaById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const talla = await tallaService.getTallaById(Number(id));
            if (!talla) {
                res.status(404).json({ error: "Talla not found" });
            } else {
                res.status(200).json(talla);
            }
        } catch (error) {
            console.error("Error fetching talla: ", error);
            res.status(500).json({ error: "Failed to fetch talla" });
        }
    }

    async updateTalla(req: Request, res: Response) {
        const { id } = req.params;
        const data: TallaUpdateData = req.body;
        try {
            const talla = await tallaService.updateTalla(Number(id), data);
            if (!talla) {
                res.status(404).json({ error: "Talla not found" });
            } else {
                res.status(200).json(talla);
            }
        } catch (error) {
            console.error("Error updating talla: ", error);
            res.status(500).json({ error: "Failed to update talla" });
        }
    }

    async deleteTalla(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await tallaService.deleteTalla(Number(id));
            if (success) {
                res.status(200).json({ message: "Talla deleted successfully" });
            } else {
                res.status(404).json({ error: "Talla not found" });
            }
        } catch (error) {
            console.error("Error deleting talla: ", error);
            res.status(500).json({ error: "Failed to delete talla" });
        }
    }
}