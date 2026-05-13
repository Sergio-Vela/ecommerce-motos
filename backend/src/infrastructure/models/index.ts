
import { Estado } from "./estadomodel";
import { Producto } from "./productomodel";
import { Usuario } from "./usuario";
import { Categoria } from "./categoriamodel";
import { Marca } from "./marcamodel";
import { Talla } from "./tallamodel";
import { Color } from "./colormodel";

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

    return { Estado, Producto, Usuario, Categoria, Marca, Talla, Color };
}