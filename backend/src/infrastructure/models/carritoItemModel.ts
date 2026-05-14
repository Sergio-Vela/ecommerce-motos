import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface CarritoItemsAttributes {
    id: CreationOptional<number>;
    carrito_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

interface CarritoItemsCreationAttributes extends Omit<CarritoItemsAttributes, 'id'> {}

export class CarritoItems extends Model<CarritoItemsAttributes, CarritoItemsCreationAttributes> {
    public id!: CreationOptional<number>;
    public carrito_id!: number;
    public producto_id!: number;
    public cantidad!: number;
    public precio_unitario!: number;
    public subtotal!: number;
}

CarritoItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        carrito_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "carrito_items",
    }
);