import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
  };
}

interface User {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api';
  private readonly STORAGE_KEY = 'user';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { correo, password }).pipe(
      tap((response) => {
        const user: User = {
          id: response.usuario.id,
          nombre: response.usuario.nombre,
          apellido: response.usuario.apellido,
          correo: response.usuario.correo,
          rol: response.usuario.rol,
          token: response.token
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.rol ?? null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    const user = this.getUser();
    return user?.token ?? null;
  }
}

export { AuthService as Auth };
