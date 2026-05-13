import { Request, Response } from "express";
import { ColorServiceImpl } from "../../infrastructure/services/colorServiceImpl";
import { ColorCreateData, ColorUpdateData } from "../../application/dtos/colorDto";

const colorService = new ColorServiceImpl();

export class ColorController {
    async createColor(req: Request, res: Response) {
        const data: ColorCreateData = req.body;
        try {
            const color = await colorService.createColor(data);
            res.status(201).json(color);
        } catch (error) {
            console.error("Error creating color: ", error);
            res.status(500).json({ error: "Failed to create color" });
        }
    }

    async getColores(req: Request, res: Response) {
        try {
            const colores = await colorService.getColores();
            res.status(200).json(colores);
        } catch (error) {
            console.error("Error fetching colores: ", error);
            res.status(500).json({ error: "Failed to fetch colores" });
        }
    }

    async getColorById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const color = await colorService.getColorById(Number(id));
            if (!color) {
                res.status(404).json({ error: "Color not found" });
            } else {
                res.status(200).json(color);
            }
        } catch (error) {
            console.error("Error fetching color: ", error);
            res.status(500).json({ error: "Failed to fetch color" });
        }
    }

    async updateColor(req: Request, res: Response) {
        const { id } = req.params;
        const data: ColorUpdateData = req.body;
        try {
            const color = await colorService.updateColor(Number(id), data);
            if (!color) {
                res.status(404).json({ error: "Color not found" });
            } else {
                res.status(200).json(color);
            }
        } catch (error) {
            console.error("Error updating color: ", error);
            res.status(500).json({ error: "Failed to update color" });
        }
    }

    async deleteColor(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await colorService.deleteColor(Number(id));
            if (success) {
                res.status(200).json({ message: "Color deleted successfully" });
            } else {
                res.status(404).json({ error: "Color not found" });
            }
        } catch (error) {
            console.error("Error deleting color: ", error);
            res.status(500).json({ error: "Failed to delete color" });
        }
    }
}