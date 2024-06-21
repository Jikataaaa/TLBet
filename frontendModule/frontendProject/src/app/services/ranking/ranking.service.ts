import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoundModel } from 'src/app/components/round/models/round.model';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
import { BaseRequestService } from '../common/base-request.service';

@Injectable({
    providedIn: 'root'
})
export class RankingService extends BaseRequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    getGeneralRanking(): Observable<Ranking[]> {
        return this.get<Ranking[]>("ranking/general-ranking");
    }

    getRounds(): Observable<RoundModel[]> {
        return this.get<RoundModel[]>("ranking/get-rounds");
    }

    getRankingByRound(roundId: number): Observable<Ranking[]> {
        const params = new HttpParams().set('roundId', roundId);
        return this.get<Ranking[]>("ranking/get-ranking-by-round", params);
    }
}
