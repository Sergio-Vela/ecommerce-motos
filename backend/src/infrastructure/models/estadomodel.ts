import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Estado extends Model {
    public id!: number;
    public nombre!: string;
    public detalle!: string;
}

Estado.init(
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
        detalle: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "estados",
    }
);