import { Client } from "pg";
import { Server } from "socket.io";
import dotenv from 'dotenv';

dotenv.config();

export async function startPgListener(io: Server){

    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await client.connect();

    await client.query('Listen canal_amigos');

    client.on('notification', (msg) => {
        if (msg.channel === 'canal_amigos'){
            const payload = JSON.parse(msg.payload!);
            io.emit('amigo_creado', payload);
            console.log('Notificación recibida:', payload);
        }
    });

    client.on('error', (err) => {
        console.error('Error en la conexión a PsotgreSQL', err);
    });
}