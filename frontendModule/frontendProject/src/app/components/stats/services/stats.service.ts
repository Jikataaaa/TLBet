import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { CorrectMatchWinnerModel } from '../models/correct-match-winner.model';
import { ExactResultModel } from '../models/exact-result.model';
import { MostViewedUserModel } from '../models/most-viewed-user.model';
import { TeamPickPercentageModel } from '../models/team-pick-percentage.model';

@Injectable({
    providedIn: 'root',
})
export class StatsService extends BaseRequestService {

    constructor (http: HttpClient) {
        super(http);
    }

    correctMatchWinner(): Observable<CorrectMatchWinnerModel[]> {
        return this.get<CorrectMatchWinnerModel[]>(`stats/correct-match-winner`);
    }

    exactResult(): Observable<ExactResultModel[]> {
        return this.get<ExactResultModel[]>(`stats/exact-result`);
    }

    teamPickWinner(): Observable<TeamPickPercentageModel[]> {
        return this.get<TeamPickPercentageModel[]>(`stats/team-pick-winner`);
    }

    mostViewedUsers(): Observable<MostViewedUserModel[]> {
        return this.get<MostViewedUserModel[]>(`stats/most-viewed-users`);
    }
}
