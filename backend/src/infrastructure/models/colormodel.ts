import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface ColorAttributes {
    id: CreationOptional<number>;
    nombre: string;
    descripcion: string;
}

interface ColorCreationAttributes extends Omit<ColorAttributes, 'id'> {}

export class Color extends Model<ColorAttributes, ColorCreationAttributes> {
    public id!: CreationOptional<number>;
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