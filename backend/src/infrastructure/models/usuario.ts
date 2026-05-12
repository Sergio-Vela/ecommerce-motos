import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Usuario extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public correo!: string;
    public password!: string;
    public telefono!: string;
    public direccion!: string;
    public rol!: string;
    public estadoId!: number;
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
    }
);