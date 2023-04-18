import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ranking } from 'src/app/shared/interfaces/Ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private token = localStorage.getItem("token")

  constructor(private http : HttpClient) { }

  getGeneralRanking(){
    return this.http.get<Ranking[]>("http://localhost:8080/ranking/general-ranking", {
      headers : {
        Authorization : `Bearer ${this.token}`
      }
    })
  }
  getCurrentYearRanking(){
    return this.http.get<Ranking[]>("http://localhost:8080/ranking/current-year-ranking", {
      headers : {
        Authorization : `Bearer ${this.token}`
      }
    })
  }
  getLastRoundRanking(){
    return this.http.get<Ranking[]>("http://localhost:8080/ranking/last-round-ranking", {
      headers : {
        Authorization : `Bearer ${this.token}`
      }
    })
  }

}
