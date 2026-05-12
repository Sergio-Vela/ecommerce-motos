import { Usuario } from "../models/usuario";
import type { UsuarioService } from "../../domain/services/usuarioService";
import type { UsuarioCreateData, UsuarioUpdateData } from "../../application/dtos/usuarioDto";

export class UsuarioServiceImpl implements UsuarioService {
    async createUsuario(data: UsuarioCreateData): Promise<Usuario> {
        return await Usuario.create(data);
    }

    async getUsuarios(): Promise<Usuario[]> {
        return await Usuario.findAll({
            include: ['estado']
        });
    }

    async getUsuarioById(id: number): Promise<Usuario | null> {
        return await Usuario.findByPk(id, {
            include: ['estado']
        });
    }

    async updateUsuario(id: number, data: UsuarioUpdateData): Promise<Usuario | null> {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return null;
        await usuario.update(data);
        return usuario;
    }

    async deleteUsuario(id: number): Promise<boolean> {
        const deleted = await Usuario.destroy({ where: { id } });
        return deleted > 0;
    }
}