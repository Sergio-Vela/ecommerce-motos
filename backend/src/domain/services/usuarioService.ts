import { Usuario } from "../../infrastructure/models/usuario";
import { UsuarioCreateData, UsuarioUpdateData } from "../../application/dtos/usuarioDto";

export interface UsuarioService {
    createUsuario(data: UsuarioCreateData): Promise<Usuario>;
    getUsuarios(): Promise<Usuario[]>;
    getUsuarioById(id: number): Promise<Usuario | null>;
    updateUsuario(id: number, data: UsuarioUpdateData): Promise<Usuario | null>;
    deleteUsuario(id: number): Promise<boolean>;
}