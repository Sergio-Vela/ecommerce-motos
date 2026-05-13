import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  checkoutCart(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, {});
  }

  getPedidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getLatestPedido(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`);
  }
}
