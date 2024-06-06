import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, first, map, of } from 'rxjs';
import { AuthUser } from 'src/app/shared/interfaces/AuthUser';
import { User } from 'src/app/shared/interfaces/User';
import { BaseRequestService } from '../common/base-request.service';
import { Login } from './models/Login';
import { Register } from './models/Register';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseRequestService {
    constructor (http: HttpClient) {
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

    getAllUsers() {
        return this.http.get<User[]>(
            `http://localhost:8080/${this.resourceUrl}/all-users`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
    }

    async getUserIdByUsername(username: string): Promise<Observable<number>> {
        return this.http.get<number>(`http://localhost:8080/${this.resourceUrl}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                username: username,
            },
        });
    }

    get resourceUrl(): string {
        return 'api/v1/auth';
    }
}
