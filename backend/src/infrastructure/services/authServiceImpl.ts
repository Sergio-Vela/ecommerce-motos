import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
import type { AuthService } from "../../domain/services/authService";
import type { LoginData } from "../../application/dtos/authDto";

export class AuthServiceImpl implements AuthService {
    async login(data: LoginData): Promise<{ token: string; usuario: any }> {
        const usuario = await Usuario.findOne({ where: { correo: data.correo } });
        if (!usuario) {
            throw new Error("Correo o contraseña incorrectos");
        }

        const validPassword = await bcrypt.compare(data.password, usuario.password);
        if (!validPassword) {
            throw new Error("Correo o contraseña incorrectos");
        }

        const secret = process.env.JWT_SECRET || "secretkey";
        const token = jwt.sign(
            {
                userId: usuario.id,
                correo: usuario.correo,
                rol: usuario.rol,
            },
            secret,
            { expiresIn: "1h" }
        );

        const usuarioJson = usuario.toJSON() as any;
        delete usuarioJson.password;

        return { token, usuario: usuarioJson };
    }
}
