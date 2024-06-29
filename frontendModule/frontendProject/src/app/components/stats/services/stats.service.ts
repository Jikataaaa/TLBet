import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { CorrectMatchWinnerModel } from '../models/correct-match-winner.model';
import { ExactResultModel } from '../models/exact-result.model';
import { TeamPickPercentageModel } from '../models/team-pick-percentage.model';

@Injectable({
    providedIn: 'root',
})
export class StatsService extends BaseRequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    correctMatchWinner(): Observable<CorrectMatchWinnerModel[]> {
        return this.get<CorrectMatchWinnerModel[]>(`users/correct-match-winner`);
    }

    exactResult(): Observable<ExactResultModel[]> {
        return this.get<ExactResultModel[]>(`users/exact-result`);
    }

    teamPickWinner(): Observable<TeamPickPercentageModel[]> {
        return this.get<TeamPickPercentageModel[]>(`users/team-pick-winner`);
    }
}
