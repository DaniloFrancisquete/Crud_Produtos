import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://interview.t-alpha.com.br/api/auth';

  constructor(private http: HttpClient) {}

  login(taxNumber: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { taxNumber, password }).pipe(
      tap(response => {
        console.log('Resposta do login:', response);
        const token = response.token;
        if (token) {
          this.setToken(token);
        } else {
          console.error('Token não encontrado na resposta:', response);
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  setToken(token: string): void {
    console.log('Token armazenado:', token);
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    console.log('Logout realizado');
    localStorage.removeItem('authToken');
  }
}
