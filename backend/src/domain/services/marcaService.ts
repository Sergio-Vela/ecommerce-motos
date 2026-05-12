import { Marca } from "../../infrastructure/models/marcamodel";
import { MarcaCreateData, MarcaUpdateData } from "../../application/dtos/marcaDto";

export interface MarcaService {
    createMarca(data: MarcaCreateData): Promise<Marca>;
    getMarcas(): Promise<Marca[]>;
    getMarcaById(id: number): Promise<Marca | null>;
    updateMarca(id: number, data: MarcaUpdateData): Promise<Marca | null>;
    deleteMarca(id: number): Promise<boolean>;
}