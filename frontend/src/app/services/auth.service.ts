import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken(): void {
    const token = this.getAccessToken();
    if (!token) {
      return;
    }
    const decodedToken: any = jwtDecode(token);
    if (new Date(decodedToken.exp * 1000).getTime() < new Date().getTime()) {
      return;
    }
    this.isAuthenticated = true;
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/token/`, { username, password })
      .pipe(
        tap((response) => {
          if (response.access) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            this.isAuthenticated = true;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated = false;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  signup(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup/`, {
      username,
      password,
      email,
    });
  }
  getRoles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/roles/`).pipe(
      tap((res) => {
        console.log('Roles fetched:', res);
      })
    );
  }
}
