import express from "express";
import cors from "cors";
import { estadoRoutes } from "./src/interfaces/routes/estadoRoutes";

export const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use("/api", estadoRoutes);

app.get("/health", (req,res) => {
    res.send("todo bien")
});