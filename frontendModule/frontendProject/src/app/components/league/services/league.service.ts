import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { LeagueModel } from '../model/league.model';

@Injectable({
    providedIn: 'root',
})
export class LeagueService extends BaseRequestService {

    constructor (http: HttpClient) {
        super(http);
    }

    getAll(): Observable<LeagueModel[]> {
        return this.get<LeagueModel[]>('leagues/getAll');
    }

    add(league: LeagueModel): Observable<number> {
        return this.post<number, LeagueModel>('leagues/add', league);
    }

    edit(league: LeagueModel): Observable<number> {
        return this.put<number, LeagueModel>('leagues/edit', league);
    }

    deleteLeague(id: number): Observable<void> {
        return this.delete<void>(`leagues/delete`, new HttpParams().set('id', id));
    }
}
