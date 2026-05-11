import { Estado } from "../models/estadomodel";
import type { EstadoService } from "../../domain/services/estadoService";

export class EstadoServiceImpl implements EstadoService {
    async createEstado(nombre: string, detalle: string): Promise<Estado> {
        return await Estado.create({ nombre, detalle });
    }

    async getEstados(): Promise<Estado[]> {
        return await Estado.findAll();
    }

    async getEstadoById(id: number): Promise<Estado | null> {
        return await Estado.findByPk(id);
    }

    async updateEstado(id: number, nombre?: string, detalle?: string): Promise<Estado | null> {
        const estado = await Estado.findByPk(id);
        if (!estado) return null;
        const updateData: any = {};
        if (nombre !== undefined) updateData.nombre = nombre;
        if (detalle !== undefined) updateData.detalle = detalle;
        await estado.update(updateData);
        return estado;
    }

    async deleteEstado(id: number): Promise<boolean> {
        const deleted = await Estado.destroy({ where: { id } });
        return deleted > 0;
    }
}