import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  create(title: string, author: string, description: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/complaints/`, { title, author, description })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
  getComplaints(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/complaints`).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
