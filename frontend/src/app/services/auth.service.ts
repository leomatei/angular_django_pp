import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/token/`, { username, password })
      .pipe(
        tap((response) => {
          if (response.access) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
