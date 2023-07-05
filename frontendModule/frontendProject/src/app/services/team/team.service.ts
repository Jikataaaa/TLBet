import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Team } from 'src/app/shared/interfaces/Team';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) {}

  createNewTeam(form: FormGroup) {
    const {name, imageUrl} = form.value;

    this.http
      .post<Team>(
        'http://localhost:8080/team/new-team',
        { name, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ).subscribe(response => console.log(response))
    form.reset();
  }

   getAllTeams() {
   return this.http.get<Team[]>('http://localhost:8080/team/all-teams', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}
