import { Categoria } from "../models/categoriamodel";
import type { CategoriaService } from "../../domain/services/categoriaService";
import type { CategoriaCreateData, CategoriaUpdateData } from "../../application/dtos/categoriaDto";

export class CategoriaServiceImpl implements CategoriaService {
    async createCategoria(data: CategoriaCreateData): Promise<Categoria> {
        return await Categoria.create(data);
    }

    async getCategorias(): Promise<Categoria[]> {
        return await Categoria.findAll();
    }

    async getCategoriaById(id: number): Promise<Categoria | null> {
        return await Categoria.findByPk(id);
    }

    async updateCategoria(id: number, data: CategoriaUpdateData): Promise<Categoria | null> {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return null;
        await categoria.update(data);
        return categoria;
    }

    async deleteCategoria(id: number): Promise<boolean> {
        const deleted = await Categoria.destroy({ where: { id } });
        return deleted > 0;
    }
}