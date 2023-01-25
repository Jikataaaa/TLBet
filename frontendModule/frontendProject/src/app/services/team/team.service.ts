import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Team } from 'src/app/shared/interfaces/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  createNewTeam(form: FormGroup) {

    const token = localStorage.getItem('token');
  const name = form.value.name;

    this.http.post<Team>('http://localhost:8080/team/add',{name}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).subscribe(response => {
      console.log(response.name)
    });
    form.reset();
  }

  getAllTeams(){
    this.http.get<Team[]>('http://localhost:8080/team/all-teams')
  }

}
