import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MockData } from 'src/app/MockData';
import { BaseRequestService } from '../common/base-request.service';
import { Match } from './models/Match';

@Injectable({
    providedIn: 'root',
})
export class MatchService extends BaseRequestService {
    constructor(http: HttpClient) {
        super(http);
    }

    createMatch(homeTeam: number, awayTeam: number, tournament: number) {
        this.http
            .post(
                'http://localhost:8080/match/new-match',
                { homeTeam, awayTeam, tournament },
            )
            .subscribe((response) => {

            });
    }

    getAllMatches(): Observable<Match[]> {
        //  const params = new HttpParams().set('username', 'jivko');
         return this.get<Match[]>('match/all-matches');
    }

    editMatch(form: FormGroup, id: number, homeTeamId: number, awayTeamId: number, tournamentId: number) {
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
                params: {
                    time: time,
                },
            }
        );
    }
}
