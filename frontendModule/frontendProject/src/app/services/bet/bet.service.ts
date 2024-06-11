import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { BaseRequestService } from '../common/base-request.service';

@Injectable({
    providedIn: 'root',
})
export class BetService extends BaseRequestService {
    
    constructor(http: HttpClient) {
        super(http);
    }

    createBets(bets: NewBet[]): Observable<NewBet[]> {
        return this.post<NewBet[], NewBet[]>('bet/new-bets', bets);
    }
}
