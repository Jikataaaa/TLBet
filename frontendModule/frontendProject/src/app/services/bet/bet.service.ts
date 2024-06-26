import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { BaseRequestService } from '../common/base-request.service';
import { BetMatchModel } from 'src/app/components/match/models/bet-match.model';

@Injectable({
    providedIn: 'root',
})
export class BetService extends BaseRequestService {
    
    constructor(http: HttpClient) {
        super(http);
    }

    createBets(bets: NewBet[]): Observable<BetMatchModel[]> {
        return this.post<BetMatchModel[], NewBet[]>('bet/new-bets', bets);
    }
}
