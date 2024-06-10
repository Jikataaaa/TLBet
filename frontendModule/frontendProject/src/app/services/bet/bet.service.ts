import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { PersonalBet } from 'src/app/shared/interfaces/PersonalBet';
import { BaseRequestService } from '../common/base-request.service';
import { Observable } from 'rxjs';

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

    getAllBetsByUser(id: number): Observable<PersonalBet[]> {
        return this.get<PersonalBet[]>('bet/all-user-bets');
    }

    getAllBetsByUsername(username: string) {
        return this.get<PersonalBet[]>('bet/personal-bets', new HttpParams().set('username', username));
    }
}
