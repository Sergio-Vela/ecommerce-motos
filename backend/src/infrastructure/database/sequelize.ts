import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfuly :3.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
        throw error;
    }
};