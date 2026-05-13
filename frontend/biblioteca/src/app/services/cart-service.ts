import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoDto } from '../interfaces/carrito-dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = 'http://localhost:3000/api/carrito';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CarritoDto> {
    return this.http.get<CarritoDto>(this.baseUrl);
  }

  removeCartItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/item/${itemId}`);
  }

  addToCart(productoId: number, cantidad: number): Observable<CarritoDto> {
    return this.http.post<CarritoDto>(`${this.baseUrl}/agregar`, { productoId, cantidad });
  }
}
