import { DataTypes, DecimalDataType, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Producto extends Model {
    public id!: number;
    public nombre!: string;
    public descripcion!: string;
    public precio!: DecimalDataType;
    public stock!: number;
    public categoriaId!: number;
    public marcaId!: number;
    public tallaId!: number;
    public colorId!: number;
    public imagenUrl!: string;
    public estadoId!: number;
}

Producto.init(
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
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        marcaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tallaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        estadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "productos",
    }
);