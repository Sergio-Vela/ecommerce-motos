import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoDto } from '../interfaces/producto-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoDto[]> {
    return this.http.get<ProductoDto[]>(this.apiUrl);
  }
}
