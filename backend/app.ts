import express from "express";
import cors from "cors";
import { estadoRoutes } from "./src/interfaces/routes/estadoRoutes";
import { productoRoutes } from "./src/interfaces/routes/productoRoutes";
import { usuarioRoutes } from "./src/interfaces/routes/usuarioRoutes";
import { categoriaRoutes } from "./src/interfaces/routes/categoriaRoutes";
import { marcaRoutes } from "./src/interfaces/routes/marcaRoutes";
import { tallaRoutes } from "./src/interfaces/routes/tallaRoutes";
import { colorRoutes } from "./src/interfaces/routes/colorRoutes";

export const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use("/api", estadoRoutes);
app.use("/api", productoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", marcaRoutes);
app.use("/api", tallaRoutes);
app.use("/api", colorRoutes);

app.get("/health", (req,res) => {
    res.send("todo bien")
});