import { sequelize, connectDB } from "./sequelize";
import { registerModels } from "../models";

export const initDatabase = async() => {
    await connectDB();
    registerModels();
    await sequelize.sync({alter: true});
}