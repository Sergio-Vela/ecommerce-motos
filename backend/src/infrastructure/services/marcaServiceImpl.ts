import { Marca } from "../models/marcamodel";
import type { MarcaService } from "../../domain/services/marcaService";
import type { MarcaCreateData, MarcaUpdateData } from "../../application/dtos/marcaDto";

export class MarcaServiceImpl implements MarcaService {
    async createMarca(data: MarcaCreateData): Promise<Marca> {
        return await Marca.create(data);
    }

    async getMarcas(): Promise<Marca[]> {
        return await Marca.findAll();
    }

    async getMarcaById(id: number): Promise<Marca | null> {
        return await Marca.findByPk(id);
    }

    async updateMarca(id: number, data: MarcaUpdateData): Promise<Marca | null> {
        const marca = await Marca.findByPk(id);
        if (!marca) return null;
        await marca.update(data);
        return marca;
    }

    async deleteMarca(id: number): Promise<boolean> {
        const deleted = await Marca.destroy({ where: { id } });
        return deleted > 0;
    }
}