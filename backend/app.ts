import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { estadoRoutes } from "./src/interfaces/routes/estadoRoutes";
import { productoRoutes } from "./src/interfaces/routes/productoRoutes";
import { usuarioRoutes } from "./src/interfaces/routes/usuarioRoutes";
import { categoriaRoutes } from "./src/interfaces/routes/categoriaRoutes";
import { marcaRoutes } from "./src/interfaces/routes/marcaRoutes";
import { tallaRoutes } from "./src/interfaces/routes/tallaRoutes";
import { colorRoutes } from "./src/interfaces/routes/colorRoutes";
import { authRoutes } from "./src/interfaces/routes/authRoutes";
import { carritoRoutes } from "./src/interfaces/routes/carritoRoutes";
import { carritoItemRoutes } from "./src/interfaces/routes/carritoItemRoutes";
import { pedidoRoutes } from "./src/interfaces/routes/pedidoRoutes";
import { detallePedidoRoutes } from "./src/interfaces/routes/detallePedidoRoutes";

dotenv.config();

export const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use("/api", authRoutes);
app.use("/api", estadoRoutes);
app.use("/api", productoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", marcaRoutes);
app.use("/api", tallaRoutes);
app.use("/api", colorRoutes);
app.use("/api", carritoRoutes);
app.use("/api", carritoItemRoutes);
app.use("/api", pedidoRoutes);
app.use("/api", detallePedidoRoutes);

app.get("/health", (req,res) => {
    res.send("todo bien")
});