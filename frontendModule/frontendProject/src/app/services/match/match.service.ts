import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Match } from 'src/app/shared/interfaces/Match';
import { UserService } from '../user/user.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient, private userService: UserService) {}
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
  async getAllMatches() {
    const username = localStorage.getItem('username');
    const id = this.userService.getUserIdByUsername(username ? username : '');

    const data: number = await lastValueFrom(id);

    return this.http.get<Match[]>('http://localhost:8080/match/all-matches', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      params: {
        userId: data,
      },
    });
  }
  editMatch(
    form: FormGroup,
    id: number,
    homeTeamId: number,
    awayTeamId: number,
    tournamentId: number
  ) {
    let {
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      startTime,
      tournamentName,
      time,
    } = form.value;
    return this.http.put<Match>(
      'http://localhost:8080/match/edit-match',
      {
        id,
        homeTeamId,
        homeTeam,
        homeTeamGoals,
        awayTeamId,
        awayTeam,
        awayTeamGoals,
        startTime,
        tournamentId,
        tournamentName,
        time,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          time: time,
        },
      }
    );
  }
}
