import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = localStorage.getItem('token');
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return next.handle(req).pipe((tap({
            next: (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && (req.url.endsWith('/login') || req.url.endsWith('/register'))) {
                    localStorage.setItem('token', event.body.token);
                    localStorage.setItem('username', event.body.username);
                    localStorage.setItem('role', event.body.role);
                }
            }
        })));
    }
}