import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = ['/api/signup'];

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldExcludeToken = this.excludedUrls.some((url) =>
      req.url.includes(url)
    );

    if (shouldExcludeToken) {
      return next.handle(req);
    } else {
      const accessToken = this.authService.getAccessToken();
      if (accessToken) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  }
}
