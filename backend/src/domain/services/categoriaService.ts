import { Categoria } from "../../infrastructure/models/categoriamodel";
import { CategoriaCreateData, CategoriaUpdateData } from "../../application/dtos/categoriaDto";

export interface CategoriaService {
    createCategoria(data: CategoriaCreateData): Promise<Categoria>;
    getCategorias(): Promise<Categoria[]>;
    getCategoriaById(id: number): Promise<Categoria | null>;
    updateCategoria(id: number, data: CategoriaUpdateData): Promise<Categoria | null>;
    deleteCategoria(id: number): Promise<boolean>;
}