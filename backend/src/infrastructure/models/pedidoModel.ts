import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface PedidoAttributes {
    id: CreationOptional<number>;
    usuario_id: number;
    total: number;
    estado_id: number;
    direccion_envio: string;
    fecha_pedido: Date;
}

interface PedidoCreationAttributes extends Omit<PedidoAttributes, 'id'> {}

export class Pedido extends Model<PedidoAttributes, PedidoCreationAttributes> {
    public id!: CreationOptional<number>;
    public usuario_id!: number;
    public total!: number;
    public estado_id!: number;
    public direccion_envio!: string;
    public fecha_pedido!: Date;
}

Pedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        direccion_envio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "pedidos",
    }
);