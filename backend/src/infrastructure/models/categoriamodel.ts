import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface CategoriaAttributes {
    id: CreationOptional<number>;
    nombre: string;
    descripcion: string;
}

interface CategoriaCreationAttributes extends Omit<CategoriaAttributes, 'id'> {}

export class Categoria extends Model<CategoriaAttributes, CategoriaCreationAttributes> {
    public id!: CreationOptional<number>;
    public nombre!: string;
    public descripcion!: string;
}

Categoria.init(
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
        tableName: "categorias",
    }
);