import { Request, Response } from "express";
import { Usuario } from "../../infrastructure/models/usuario";
import { UsuarioServiceImpl } from "../../infrastructure/services/usuarioServiceImpl";
import { UsuarioCreateData, UsuarioUpdateData } from "../../application/dtos/usuarioDto";

const usuarioService = new UsuarioServiceImpl();

export class UsuarioController {
    private sanitizeUsuario(usuario: Usuario) {
        const usuarioJson = usuario.toJSON() as any;
        delete usuarioJson.password;
        return usuarioJson;
    }

    async createUsuario(req: Request, res: Response) {
        const data: UsuarioCreateData = req.body;
        try {
            const usuario = await usuarioService.createUsuario(data);
            res.status(201).json(this.sanitizeUsuario(usuario));
        } catch (error) {
            console.error("Error creating usuario: ", error);
            res.status(500).json({ error: "Failed to create usuario" });
        }
    }

    async getUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await usuarioService.getUsuarios();
            const sanitized = usuarios.map(usuario => this.sanitizeUsuario(usuario));
            res.status(200).json(sanitized);
        } catch (error) {
            console.error("Error fetching usuarios: ", error);
            res.status(500).json({ error: "Failed to fetch usuarios" });
        }
    }

    async getUsuarioById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.getUsuarioById(Number(id));
            if (!usuario) {
                res.status(404).json({ error: "Usuario not found" });
            } else {
                res.status(200).json(this.sanitizeUsuario(usuario));
            }
        } catch (error) {
            console.error("Error fetching usuario: ", error);
            res.status(500).json({ error: "Failed to fetch usuario" });
        }
    }

    async updateUsuario(req: Request, res: Response) {
        const { id } = req.params;
        const data: UsuarioUpdateData = req.body;
        try {
            const usuario = await usuarioService.updateUsuario(Number(id), data);
            if (!usuario) {
                res.status(404).json({ error: "Usuario not found" });
            } else {
                res.status(200).json(this.sanitizeUsuario(usuario));
            }
        } catch (error) {
            console.error("Error updating usuario: ", error);
            res.status(500).json({ error: "Failed to update usuario" });
        }
    }

    async deleteUsuario(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const success = await usuarioService.deleteUsuario(Number(id));
            if (success) {
                res.status(200).json({ message: "Usuario deleted successfully" });
            } else {
                res.status(404).json({ error: "Usuario not found" });
            }
        } catch (error) {
            console.error("Error deleting usuario: ", error);
            res.status(500).json({ error: "Failed to delete usuario" });
        }
    }
}