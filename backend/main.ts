import { app } from "./app";
import { initDatabase } from "./src/infrastructure/database/initDatabase";
import { Server } from "socket.io";
import { createServer } from "http";
import { startPgListener } from "./src/infrastructure/database/pgListener";


const PORT = 3000;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    }
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
});

async function startServer(){
    try {
        await initDatabase();
        await startPgListener(io);
        httpServer.listen(PORT, () =>{
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error)
    }
}

startServer();