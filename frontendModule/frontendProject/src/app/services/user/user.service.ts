import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CommonEventsService } from 'src/app/core/common/common-events.service';
import { AuthUser } from 'src/app/shared/interfaces/AuthUser';
import { User } from 'src/app/shared/interfaces/User';
import { JwtUtils } from 'src/app/shared/utils/jwt-utils';
import { JwtUserData } from 'src/app/shared/utils/model/jwt-user-data.model';
import { BaseRequestService } from '../common/base-request.service';
import { Login } from './models/Login';
import { Register } from './models/Register';
import { UserModel } from './models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseRequestService {

    get resourceUrl(): string {
        return 'api/v1/auth';
    }

    constructor(http: HttpClient, private commonEvents: CommonEventsService) {
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
        this.commonEvents.authChanged.next();
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

    getUserProfile(): Observable<UserModel> {
        return this.get<UserModel>(`users/profile`);
    }

    getUserDetails(username: string): Observable<UserModel> {
        return this.get<UserModel>(`users/details`, new HttpParams().set('username', username));
    }

    getUserJwtData(token: string): JwtUserData | null {
        if (!token) {
            return null;
        }

        let payloadData = null;
        try {
            payloadData = JwtUtils.decodeJwtPayload(token) as { sub: string, role: string, exp: number, iat: number; } | null;
            if (!payloadData) {
                return null;
            }
        }
        catch (e) {
            return null;
        }

        return new JwtUserData({
            username: payloadData.sub,
            role: payloadData.role,
            expirationDate: new Date(payloadData.exp * 1000),
            issuedAt: new Date(payloadData.iat * 1000),
        });
    }

    isAdmin(): boolean {
        let token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        let userData = this.getUserJwtData(token);
        if (!userData) {
            return false;
        }
        return userData.role === 'ADMIN';
    }
}
