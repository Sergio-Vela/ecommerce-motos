import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

export interface DashboardMetrics {
  productos: number;
  pedidos: number;
  usuarios: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<DashboardMetrics> {
    return forkJoin({
      productos: this.http.get<any[]>(`${this.apiUrl}/productos`).pipe(map(items => items?.length ?? 0)),
      pedidos: this.http.get<any[]>(`${this.apiUrl}/pedidos`).pipe(map(items => items?.length ?? 0)),
      usuarios: this.http.get<any[]>(`${this.apiUrl}/usuarios`).pipe(map(items => items?.length ?? 0)),
    });
  }
}
