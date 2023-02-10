import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Match } from 'src/app/shared/interfaces/Match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}
  createMatch(homeTeam: BigInt, awayTeam: BigInt, tournament: BigInt) {
    this.http
      .post(
        'http://localhost:8080/match/new-match',
        { homeTeam, awayTeam, tournament },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  getAllMatches() {
    return this.http.get<Match[]>('http://localhost:8080/match/all-matches', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
  editMatch(form: FormGroup) {
    const {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      startTime,
      tournamentName,
    } = form.value;

    return this.http.post<Match>(
      'http://localhost:8080/match/edit-match',
      {
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        startTime,
        tournamentName,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
  // getMatchById(id: number) {
  //   return this.http.get<Match>(
  //     'http://localhost:8080/match/get-match',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //       params : new HttpParams().append("id",id)
  //     }

  //   );
  // }
}
