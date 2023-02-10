import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament/tournament.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})

export class NewTournamentComponent {

  constructor(private service: TournamentService){}

  newTournamentForm = new FormGroup({
    name: new FormControl("")
  })

  addNewTournament(){
    this.service.addNewTournament(this.newTournamentForm);
  }

}
