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

  createBets(bets: NewBet[]) : Observable<NewBet[]>{
    
    return this.http.post<NewBet[]>('http://localhost:8080/bet/new-bets', bets, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  getAllBetsByUser(id: number) {
    return this.http.get<PersonalBet[]>(
      'http://localhost:8080/bet/all-user-bets',
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
  
  getAllBetsByUsername(username: string) {
    return this.http.get<PersonalBet[]>(
      'http://localhost:8080/bet/personal-bets',
      {
        params: {
          username: username,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
