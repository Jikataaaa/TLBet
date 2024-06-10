import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AuthUser } from 'src/app/shared/interfaces/AuthUser';
import { User } from 'src/app/shared/interfaces/User';
import { BaseRequestService } from '../common/base-request.service';
import { Login } from './models/Login';
import { Register } from './models/Register';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseRequestService {

    get resourceUrl(): string {
        return 'api/v1/auth';
    }

    constructor(http: HttpClient) {
        super(http);
    }

    getRoleAccess(token: string, username: string, role: string): Observable<boolean> {
        const params = new HttpParams()
            .set('token', token)
            .set('username', username)
            .set('role', role);

        return this.get(`${this.resourceUrl}/roleAccess`, params, 'text')
            .pipe(map((res) => res === 'true'));;
    }

    verifyAuthentication(): Observable<boolean> {
        let username = localStorage.getItem('username');
        let token = localStorage.getItem('token');
        if (!username || !token) {
            return of(false);
        }

        const params = new HttpParams()
            .set('username', username)
            .set('token', token);

        return this.get(`${this.resourceUrl}/verifyAuthentication`, params, 'text')
            .pipe(map((res) => res === 'true'));
    }

    login(login: Login): Observable<AuthUser> {
        return this.post<AuthUser, Login>(`${this.resourceUrl}/login`, login);
    }

    register(model: Register): Observable<AuthUser> {
        return this.post<AuthUser, Register>(`${this.resourceUrl}/register`, model);
    }

    logout() {
        localStorage.clear();
    }

    getAllUsers(): Observable<User[]> {
        return this.get<User[]>(`${this.resourceUrl}/all-users`);
    }

    getUserIdByUsername(username: string): Observable<number> {
        return this.get<number>(`${this.resourceUrl}/user`, new HttpParams().set('username', username));
    }

    getUserByUsername(username: string): Observable<User> {
        return this.get<User>(`${this.resourceUrl}/user-by-name`, new HttpParams().set('username', username));
    }
}
