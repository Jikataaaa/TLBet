import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { BaseRequestService } from '../common/base-request.service';
import { Observable } from 'rxjs';
import { PersonalBetModel } from '../user/models/personalBet.model';

@Injectable({
    providedIn: 'root',
})
export class BetService extends BaseRequestService {
    private token: string | null = localStorage.getItem('token');
    constructor(http: HttpClient) {
        super(http);
    }

    createBets(bets: NewBet[]): Observable<NewBet[]> {
        return this.post<NewBet[], NewBet[]>('bet/new-bets', bets);
    }

    getAllBetsByUser(id: number): Observable<PersonalBetModel[]> {
        return this.get<PersonalBetModel[]>('bet/all-user-bets');
    }
}
