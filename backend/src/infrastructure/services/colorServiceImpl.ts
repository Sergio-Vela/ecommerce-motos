import { Color } from "../models/colormodel";
import type { ColorService } from "../../domain/services/colorService";
import type { ColorCreateData, ColorUpdateData } from "../../application/dtos/colorDto";

export class ColorServiceImpl implements ColorService {
    async createColor(data: ColorCreateData): Promise<Color> {
        return await Color.create(data);
    }

    async getColores(): Promise<Color[]> {
        return await Color.findAll();
    }

    async getColorById(id: number): Promise<Color | null> {
        return await Color.findByPk(id);
    }

    async updateColor(id: number, data: ColorUpdateData): Promise<Color | null> {
        const color = await Color.findByPk(id);
        if (!color) return null;
        await color.update(data);
        return color;
    }

    async deleteColor(id: number): Promise<boolean> {
        const deleted = await Color.destroy({ where: { id } });
        return deleted > 0;
    }
}