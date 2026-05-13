import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";

const usuarioController = new UsuarioController();

export const usuarioRoutes = Router();

usuarioRoutes.post("/usuarios", (req, res) => usuarioController.createUsuario(req, res));
usuarioRoutes.get("/usuarios", (req, res) => usuarioController.getUsuarios(req, res));
usuarioRoutes.get("/usuarios/:id", (req, res) => usuarioController.getUsuarioById(req, res));
usuarioRoutes.put("/usuarios/:id", (req, res) => usuarioController.updateUsuario(req, res));
usuarioRoutes.delete("/usuarios/:id", (req, res) => usuarioController.deleteUsuario(req, res));

export default usuarioRoutes;