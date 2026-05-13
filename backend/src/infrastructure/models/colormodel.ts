import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Color extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
}

Color.init(
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "colores",
    }
);