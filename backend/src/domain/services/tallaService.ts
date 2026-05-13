import { Talla } from "../../infrastructure/models/tallamodel";
import { TallaCreateData, TallaUpdateData } from "../../application/dtos/tallaDto";

export interface TallaService {
    createTalla(data: TallaCreateData): Promise<Talla>;
    getTallas(): Promise<Talla[]>;
    getTallaById(id: number): Promise<Talla | null>;
    updateTalla(id: number, data: TallaUpdateData): Promise<Talla | null>;
    deleteTalla(id: number): Promise<boolean>;
}