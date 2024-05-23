import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/User';
import { AuthUser } from 'src/app/shared/interfaces/AuthUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  async getRoleAccess(token: any, username: any, role: string) {
    const access = this.http.get(
      `http://localhost:8080/${this.resourceUrl}/roleAccess`,
      {
        params: {
          token: token,
          username: username,
          role: role,
        },
        responseType: 'text',
      }
    );

    const data = await lastValueFrom(access);
    return data;
  }

  async verifyAuthentication() {
    let username = localStorage.getItem('username');
    let token = localStorage.getItem('token');
    if (!username || !token) {
      return false;
    }

    const isVerified = this.http.get(
      `http://localhost:8080/${this.resourceUrl}/verifyAuthentication`,
      {
        params: {
          username: username,
          token: token,
        },
        responseType: 'text',
      }
    );

    const data = await lastValueFrom(isVerified);
    if (data == 'false') {
      localStorage.clear();
    }
    return data;
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
        this.setLocaleStorageData(response);
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
        this.setLocaleStorageData(response);
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

  async getUserIdByUsername(username: string) : Promise<Observable<number>> {
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

  private setLocaleStorageData(user: AuthUser) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role);
  }
}
