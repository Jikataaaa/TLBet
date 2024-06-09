import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export abstract class BaseRequestService {
    protected baseUrl: string = environment.serviceBaseUrl;

    constructor(protected http: HttpClient) { }

    protected get<TResult>(url: string, params?: HttpParams, responseType: 'json' | 'text' = 'json'): Observable<TResult> {
        if (responseType === 'text') {
            return this.http.get(`${this.baseUrl}${url}`, {
                params: params,
                responseType: 'text',
            }) as Observable<TResult>;
        } else {
            return this.http.get<TResult>(`${this.baseUrl}${url}`, {
                params: params,
                responseType: 'json',
            });
        }
    }

    protected post<TResult, TBody>(url: string, body?: TBody, params?: HttpParams): Observable<TResult> {
        return this.http.post<TResult>(`${this.baseUrl}${url}`, body, {
            params: params,
        });
    }

    protected put<TResult, TBody>(url: string, body?: TBody, params?: HttpParams): Observable<TResult> {
        return this.http.put<TResult>(`${this.baseUrl}${url}`, body, {
            params: params,
        });
    }

    protected patch<TResult, TBody>(url: string, body?: TBody, params?: HttpParams): Observable<TResult> {
        return this.http.patch<TResult>(`${this.baseUrl}${url}`, body, {
            params: params,
        });
    }

    protected delete<TResult>(url: string, params?: HttpParams): Observable<TResult> {
        return this.http.delete<TResult>(`${this.baseUrl}${url}`, {
            params: params,
        });
    }
}