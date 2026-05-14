import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UsuarioDto } from '../../interfaces/usuario-dto';

interface LoginResponse {
  token: string;
  data: UsuarioDto;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly userKey = 'auth_user';
  user = signal<UsuarioDto | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  login(correo: string, password: string) {
    return this.http.post<LoginResponse>('http://localhost:3000/api/auth/login', {
      correo,
      password,
    }).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.saveUser(response.data);
        this.user.set(response.data);
      })
    );
  }

  logout() {
    if (this.hasStorage()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.user.set(null);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return this.hasStorage() ? localStorage.getItem(this.tokenKey) : null;
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private saveToken(token: string) {
    if (this.hasStorage()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  private saveUser(user: UsuarioDto) {
    if (this.hasStorage()) {
      const safeUser = { ...user };
      delete (safeUser as Partial<UsuarioDto>).password;
      localStorage.setItem(this.userKey, JSON.stringify(safeUser));
    }
  }

  private loadUser(): UsuarioDto | null {
    if (!this.hasStorage()) {
      return null;
    }

    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) as UsuarioDto : null;
  }

  private hasStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
