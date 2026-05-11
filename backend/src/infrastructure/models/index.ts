
import { Estado } from "./estadomodel";



export const registerModels = () => {

    // Estado.hasMany(Reserva, { foreignKey: 'estadoId', as: 'reservas' });
    // Reserva.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });

    return {Estado};
}