import { Carrito } from "../../infrastructure/models/carritoModel";
import { CarritoCreateData, CarritoUpdateData, CarritoAddProductData } from "../../application/dtos/carritoDto";

export interface CarritoService {
    createCarrito(data: CarritoCreateData): Promise<Carrito>;
    getCarritos(): Promise<Carrito[]>;
    getCarritoById(id: number): Promise<Carrito | null>;
    getActiveCarritoByUsuario(usuarioId: number): Promise<Carrito | null>;
    addProductoToCarrito(data: CarritoAddProductData): Promise<Carrito>;
    updateCarrito(id: number, data: CarritoUpdateData): Promise<Carrito | null>;
    deleteCarrito(id: number): Promise<boolean>;
}
