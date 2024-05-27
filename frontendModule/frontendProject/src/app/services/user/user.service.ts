import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { AuthUser } from 'src/app/shared/interfaces/AuthUser';
import { User } from 'src/app/shared/interfaces/User';
import { BaseRequestService } from '../common/base-request.service';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseRequestService {
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

    login(form: FormGroup) {
        if (form.invalid) {
            return;
        }
        const username = form.value.username;
        const password = form.value.password;
        this.http
            .post<AuthUser>(`http://localhost:8080/${this.resourceUrl}/login`, {
                username,
                password,
            })
            .subscribe((response) => {
                form.reset();
            });
    }

    register(form: FormGroup) {
        if (form.invalid) {
            return;
        }

        const { username, password } = form.value;
        this.http
            .post<AuthUser>(`http://localhost:8080/${this.resourceUrl}/register`, {
                username,
                password,
            })
            .subscribe((response) => {
                form.reset();
            });
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
