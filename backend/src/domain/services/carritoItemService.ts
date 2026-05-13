import { CarritoItems } from "../../infrastructure/models/carritoItemModel";
import { CarritoItemCreateData, CarritoItemUpdateData } from "../../application/dtos/carritoItemDto";

export interface CarritoItemService {
    createCarritoItem(data: CarritoItemCreateData): Promise<CarritoItems>;
    getCarritoItems(): Promise<CarritoItems[]>;
    getCarritoItemById(id: number): Promise<CarritoItems | null>;
    updateCarritoItem(id: number, data: CarritoItemUpdateData): Promise<CarritoItems | null>;
    updateCarritoItemQuantity(id: number, cantidad: number): Promise<CarritoItems | null>;
    deleteCarritoItemById(id: number): Promise<boolean>;
}
