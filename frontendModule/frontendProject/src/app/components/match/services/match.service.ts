import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from '../../../services/common/base-request.service';
import { BetMatchModel } from '../models/bet-match.model';
import { MatchModel } from '../models/match.model';

@Injectable({
    providedIn: 'root',
})
export class MatchService extends BaseRequestService {
    constructor (http: HttpClient) {
        super(http);
    }

    getAll(roundId: number): Observable<BetMatchModel[]> {
        return this.get<BetMatchModel[]>('match/all', new HttpParams().set('roundId', roundId.toString()));
    }

    getMatch(id: number): Observable<MatchModel> {
        return this.get<MatchModel>('match/get', new HttpParams().set('id', id.toString()));
    }

    add(match: MatchModel): Observable<number> {
        return this.post<number, MatchModel>('match/add', match);
    }

    edit(match: MatchModel): Observable<number> {
        return this.post<number, MatchModel>('match/edit', match);
    }

    deleteMatch(id: number): Observable<void> {
        return this.delete<void>('match/delete', new HttpParams().set('id', id.toString()));
    }

    //Всички мачове от последния кръг - мачове за залог
    getAllMatches(): Observable<BetMatchModel[]> {
        return this.get<BetMatchModel[]>('match/all-matches');
    }
}
