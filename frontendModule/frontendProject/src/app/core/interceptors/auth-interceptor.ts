import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CommonEventsService } from '../common/common-events.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly _unauthorizedStatus = 401;

    constructor(private router: Router, private commonEvents: CommonEventsService) { }

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
                    this.commonEvents.authChanged.next();
                }
            },
            error: (error) => {
                if (error.status === this._unauthorizedStatus) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/user/login']);
                    this.commonEvents.authChanged.next();
                }
            }
        })));
    }
}
