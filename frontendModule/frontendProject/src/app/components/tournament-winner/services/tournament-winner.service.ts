import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { TeamModel } from '../../team/models/team.model';
import { BetTournamentWinnerModel } from '../models/bet-tournament-winner.model';
import { TournamentWinnerModel } from '../models/tournament-winner.model';

@Injectable({
    providedIn: 'root',
})
export class TournamentWinnerService extends BaseRequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    getWinnerBet(): Observable<TournamentWinnerModel> {
        return this.get<TournamentWinnerModel>('tournament-bet-winner');
    }

    createTournamentBetWinner(tournament: BetTournamentWinnerModel): Observable<TournamentWinnerModel> {
        return this.post<TournamentWinnerModel, BetTournamentWinnerModel>('tournament-bet-winner', tournament);
    }

    getAllTeams(): Observable<TeamModel[]> {
        return this.get<TeamModel[]>('tournament-bet-winner/all-teams');
    }
}
