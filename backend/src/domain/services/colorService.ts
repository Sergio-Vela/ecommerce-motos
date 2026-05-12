import { Color } from "../../infrastructure/models/colormodel";
import { ColorCreateData, ColorUpdateData } from "../../application/dtos/colorDto";

export interface ColorService {
    createColor(data: ColorCreateData): Promise<Color>;
    getColores(): Promise<Color[]>;
    getColorById(id: number): Promise<Color | null>;
    updateColor(id: number, data: ColorUpdateData): Promise<Color | null>;
    deleteColor(id: number): Promise<boolean>;
}