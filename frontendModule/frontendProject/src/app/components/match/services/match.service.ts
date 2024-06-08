import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

    getAll(roundId: number): Observable<MatchModel[]> {
        return of([
            new MatchModel({
                id: 1,
                homeGoals: 2,
                awayGoals: 1,
                homeTeamId: 101,
                awayTeamId: 201,
                startTime: new Date('2024-06-01T14:00:00'),
                homeTeamImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
                awayTeamImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
                homeTeamName: 'Barcelona',
                awayTeamName: 'Real Madrid',
                roundId: 1
            }),
            new MatchModel({
                id: 2,
                homeGoals: 0,
                awayGoals: 0,
                homeTeamId: 102,
                awayTeamId: 202,
                startTime: new Date('2024-06-01T16:00:00'),
                roundId: 1,
                homeTeamImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
                awayTeamImageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
                homeTeamName: 'Barcelona',
                awayTeamName: 'Real Madrid'
            })]);
        //return this.get<MatchModel[]>('match/getAll', new HttpParams().set('roundId', roundId.toString()));
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
