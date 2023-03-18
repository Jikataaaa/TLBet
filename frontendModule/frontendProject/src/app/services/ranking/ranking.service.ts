import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private token = localStorage.getItem("token")

  constructor(private http : HttpClient) { }

  getGeneralRanking(){
    return this.http.get("http://localhost:8080/ranking/general-ranking", {
      headers : {
        Authorization : `Bearer ${this.token}`
      }
    })
  }

}
