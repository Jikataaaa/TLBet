import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent {

  constructor(private service: TeamService){

  }

  newTeamForm = new FormGroup(
    {
      name : new FormControl(""),
      imageUrl : new FormControl("")
    }
  )

  addNewTeam(){
    if(this.newTeamForm.valid){
    this.service.createNewTeam(this.newTeamForm);
    }
  }

}
