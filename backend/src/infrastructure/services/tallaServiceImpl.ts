import { Talla } from "../models/tallamodel";
import type { TallaService } from "../../domain/services/tallaService";
import type { TallaCreateData, TallaUpdateData } from "../../application/dtos/tallaDto";

export class TallaServiceImpl implements TallaService {
    async createTalla(data: TallaCreateData): Promise<Talla> {
        return await Talla.create(data);
    }

    async getTallas(): Promise<Talla[]> {
        return await Talla.findAll();
    }

    async getTallaById(id: number): Promise<Talla | null> {
        return await Talla.findByPk(id);
    }

    async updateTalla(id: number, data: TallaUpdateData): Promise<Talla | null> {
        const talla = await Talla.findByPk(id);
        if (!talla) return null;
        await talla.update(data);
        return talla;
    }

    async deleteTalla(id: number): Promise<boolean> {
        const deleted = await Talla.destroy({ where: { id } });
        return deleted > 0;
    }
}