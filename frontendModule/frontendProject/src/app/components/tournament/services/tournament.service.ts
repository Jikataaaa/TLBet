import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { TournamentModel } from '../models/tournament.model';

@Injectable({
    providedIn: 'root',
})
export class TournamentService extends BaseRequestService {

    constructor (http: HttpClient) {
        super(http);
    }

    getAll(): Observable<TournamentModel[]> {
        return this.get<TournamentModel[]>('tournaments/getAll');
    }

    add(tournament: TournamentModel): Observable<number> {
        return this.post<number, TournamentModel>('tournaments/add', tournament);
    }

    edit(tournament: TournamentModel): Observable<number> {
        return this.put<number, TournamentModel>('tournaments/edit', tournament);
    }

    deleteTournament(id: number): Observable<void> {
        return this.delete<void>(`tournaments/delete`, new HttpParams().set('id', id));
    }
}
