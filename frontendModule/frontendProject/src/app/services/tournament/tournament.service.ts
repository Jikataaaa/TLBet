import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tournament } from 'src/app/shared/interfaces/Tournament';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  addNewTournament(form: FormGroup) {
    const { name } = form.value;
    this.http.post<Tournament>(
      'http://localhost:8080/tournament/new-tournament',
      { name },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    ).subscribe(response => console.log(response));

    form.reset();
  }
  getAllTournaments() {
    return this.http.get<Tournament[]>(
      'http://localhost:8080/tournament/all-tournaments',
      
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
