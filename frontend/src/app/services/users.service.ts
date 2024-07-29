import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
  updateUserRole(userId: number, role: number): Observable<any> {
    return this.http
      .patch<any>(`${this.baseUrl}/users/${userId}/`, { role })
      .pipe(
        tap((res) => {
          console.log('User role updated:', res);
        })
      );
  }
}
