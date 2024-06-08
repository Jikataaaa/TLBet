import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { RoundModel } from '../models/round.model';
import { ActiveRound } from '../models/active-round.model';

@Injectable({
    providedIn: 'root',
})
export class RoundService extends BaseRequestService {

    constructor (http: HttpClient) {
        super(http);
    }

    getAll(tournamentId: number): Observable<RoundModel[]> {
        return this.get<RoundModel[]>('rounds/getAll', new HttpParams().set('tournamentId', tournamentId));
    }

    add(round: RoundModel): Observable<number> {
        return this.post<number, RoundModel>('rounds/add', round);
    }

    edit(round: RoundModel): Observable<number> {
        return this.put<number, RoundModel>('rounds/edit', round);
    }

    deleteRound(id: number): Observable<void> {
        return this.delete<void>(`rounds/delete`, new HttpParams().set('id', id));
    }

    setRoundActiveById(id: number): Observable<number> {
        return this.post<number, number>('rounds/setActive', id);
    }

    getActiveRound(): Observable<ActiveRound> {
        return this.get<ActiveRound>('rounds/activeRound');
    }
}
