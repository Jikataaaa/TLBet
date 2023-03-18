import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { PersonalBet } from 'src/app/shared/interfaces/PersonalBet';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) { }

  createBet(homeTeamGoals : number, awayTeamGoals: number, matchId : number){
   let username = localStorage.getItem("username")
  return this.http.post<NewBet>('http://localhost:8080/bet/new-bet', {homeTeamGoals, awayTeamGoals, matchId, username}, {
    headers : {
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }
  })
  }
  getAllBetsByUser(id : number){
    return this.http.get<PersonalBet[]>('http://localhost:8080/bet/all-user-bets', {
      params: {
        id : id
      },
      headers : {
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }
  }
  )
  }
  getAllBetsByUsername(username : string){
    return this.http.get<PersonalBet[]>('http://localhost:8080/bet/personal-bets', {
      params: {
        username : username
      },
      headers : {
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }
  }
  )
  }

}
