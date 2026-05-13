import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface CarritoAttributes {
    id: CreationOptional<number>;
    usuarioId: number;
    estadoId: number;
}

interface CarritoCreationAttributes extends Omit<CarritoAttributes, 'id'> {}

export class Carrito extends Model<CarritoAttributes, CarritoCreationAttributes> {
    public id!: CreationOptional<number>;
    public usuarioId!: number;
    public estadoId!: number;
}

Carrito.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "carritos",
    }
);