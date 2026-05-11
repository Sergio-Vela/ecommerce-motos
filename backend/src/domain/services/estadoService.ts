import { Estado } from "../../infrastructure/models/estadomodel";

export interface EstadoService {
    createEstado(nombre: string, detalle: string): Promise<Estado>;
    getEstados(): Promise<Estado[]>;
    getEstadoById(id: number): Promise<Estado | null>;
    updateEstado(id: number, nombre?: string, detalle?: string): Promise<Estado | null>;
    deleteEstado(id: number): Promise<boolean>;
}