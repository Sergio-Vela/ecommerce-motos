
import { Estado } from "./estadomodel";
import { Producto } from "./productomodel";
import { Usuario } from "./usuario";
import { Categoria } from "./categoriamodel";
import { Marca } from "./marcamodel";
import { Talla } from "./tallamodel";
import { Color } from "./colormodel";
import { Carrito } from "./carritoModel";
import { CarritoItems } from "./carritoItemModel";
import { Pedido } from "./pedidoModel";
import { DetallePedido } from "./detallePedidoModel";

export const registerModels = () => {
    // Relaciones para Producto
    Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
    Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });

    Producto.belongsTo(Marca, { foreignKey: 'marcaId', as: 'marca' });
    Marca.hasMany(Producto, { foreignKey: 'marcaId', as: 'productos' });

    Producto.belongsTo(Talla, { foreignKey: 'tallaId', as: 'talla' });
    Talla.hasMany(Producto, { foreignKey: 'tallaId', as: 'productos' });

    Producto.belongsTo(Color, { foreignKey: 'colorId', as: 'color' });
    Color.hasMany(Producto, { foreignKey: 'colorId', as: 'productos' });

    Producto.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
    Estado.hasMany(Producto, { foreignKey: 'estadoId', as: 'productos' });

    // Relaciones para Usuario
    Usuario.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
    Estado.hasMany(Usuario, { foreignKey: 'estadoId', as: 'usuarios' });

    // Relaciones para Carrito
    Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    Usuario.hasMany(Carrito, { foreignKey: 'usuarioId', as: 'carritos' });

    Carrito.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
    Estado.hasMany(Carrito, { foreignKey: 'estadoId', as: 'carritos' });

    CarritoItems.belongsTo(Carrito, { foreignKey: 'carrito_id', as: 'carrito' });
    Carrito.hasMany(CarritoItems, { foreignKey: 'carrito_id', as: 'items' });

    CarritoItems.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });
    Producto.hasMany(CarritoItems, { foreignKey: 'producto_id', as: 'carritoItems' });

    // Relaciones para Pedido
    Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    Usuario.hasMany(Pedido, { foreignKey: 'usuario_id', as: 'pedidos' });

    Pedido.belongsTo(Estado, { foreignKey: 'estado_id', as: 'estado' });
    Estado.hasMany(Pedido, { foreignKey: 'estado_id', as: 'pedidos' });

    DetallePedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    Pedido.hasMany(DetallePedido, { foreignKey: 'pedido_id', as: 'detalles' });

    DetallePedido.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });
    Producto.hasMany(DetallePedido, { foreignKey: 'producto_id', as: 'detallePedidos' });

    return {
        Estado,
        Producto,
        Usuario,
        Categoria,
        Marca,
        Talla,
        Color,
        Carrito,
        CarritoItems,
        Pedido,
        DetallePedido,
    };
}