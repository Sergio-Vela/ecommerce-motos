import { Request, Response } from "express";
import { EstadoServiceImpl } from "../../infrastructure/services/estadoServiceImpl";

const estadoService = new EstadoServiceImpl();

export class EstadoController {
    async createEstado(req: Request, res: Response) {
        const { nombre, detalle } = req.body;
        try {
            const estado = await estadoService.createEstado(nombre, detalle);
            res.status(201).json(estado);
        } catch (error) {
            console.error("Error creating estado: ", error);
            res.status(500).json({ error: "Failed to create estado" });
        }
    }

    async getEstados(req: Request, res: Response) {
        try {
            const estados = await estadoService.getEstados();
            res.status(200).json(estados);
        } catch (error) {
            console.error("Error fetching estados: ", error);
            res.status(500).json({ error: "Failed to fetch estados" });
        }
    }

    async getEstadoById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const estado = await estadoService.getEstadoById(Number(id));
            if (!estado) {
                res.status(404).json({ error: "Estado not found" });
            } else {
                res.status(200).json(estado);
            }
        } catch (error) {
            console.error("Error fetching estado: ", error);
            res.status(500).json({ error: "Failed to fetch estado" });
        }
    }

    async updateEstado(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, detalle } = req.body;
        try {
            const estado = await estadoService.updateEstado(Number(id), nombre, detalle);
            if (!estado) {
                res.status(404).json({ error: "Estado not found" });
            } else {
                res.status(200).json(estado);
            }
        } catch (error) {
            console.error("Error updating estado: ", error);
            res.status(500).json({ error: "Failed to update estado" });
        }
    }

    async deleteEstado(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await estadoService.deleteEstado(Number(id));
            if (success) {
                res.status(200).json({ message: "Estado deleted successfully" });
            } else {
                res.status(404).json({ error: "Estado not found" });
            }
        } catch (error) {
            console.error("Error deleting estado: ", error);
            res.status(500).json({ error: "Failed to delete estado" });
        }
    }
}
