import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequestService } from 'src/app/services/common/base-request.service';
import { TeamModel } from '../models/team.model';

@Injectable({
    providedIn: 'root',
})
export class TeamService extends BaseRequestService {

    constructor (http: HttpClient) {
        super(http);
    }

    getAll(): Observable<TeamModel[]> {
        return this.get<TeamModel[]>('team/all-teams');
    }
    
    getAllByLeagueId(id: number): Observable<TeamModel[]> {
        return this.get<TeamModel[]>('team/getAllByLeagueId', new HttpParams().set('id', id));
    }

    add(round: TeamModel): Observable<number> {
        return this.post<number, TeamModel>('team/new-team', round);
    }

    edit(round: TeamModel): Observable<number> {
        return this.put<number, TeamModel>('team/edit', round);
    }

    deleteTeam(id: number): Observable<void> {
        return this.delete<void>(`team/delete`, new HttpParams().set('id', id));
    }
}
