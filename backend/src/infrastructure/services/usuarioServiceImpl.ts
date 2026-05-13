import bcrypt from "bcryptjs";
import { Usuario } from "../models/usuario";
import type { UsuarioService } from "../../domain/services/usuarioService";
import type { UsuarioCreateData, UsuarioUpdateData } from "../../application/dtos/usuarioDto";

export class UsuarioServiceImpl implements UsuarioService {
    async createUsuario(data: UsuarioCreateData): Promise<Usuario> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await Usuario.create({ ...data, password: hashedPassword });
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
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await usuario.update(data);
        return usuario;
    }

    async deleteUsuario(id: number): Promise<boolean> {
        const deleted = await Usuario.destroy({ where: { id } });
        return deleted > 0;
    }
}