import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../database/sequelize";

interface DetallePedidoAttributes {
    id: CreationOptional<number>;
    pedido_id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

interface DetallePedidoCreationAttributes extends Omit<DetallePedidoAttributes, 'id'> {}

export class DetallePedido extends Model<DetallePedidoAttributes, DetallePedidoCreationAttributes> {
    public id!: CreationOptional<number>;
    public pedido_id!: number;
    public producto_id!: number;
    public cantidad!: number;
    public precio_unitario!: number;
    public subtotal!: number;
}

DetallePedido.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pedido_id: {
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
        tableName: "detalles_pedidos",
    }
);