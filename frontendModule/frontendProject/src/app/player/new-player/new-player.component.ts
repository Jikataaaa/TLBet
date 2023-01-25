import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

ngOnInit(): void {
  this.populateTeamOptions();
  this.populatePositionOptions();
}
constructor(private service : PlayerService){

}
options = [{id:0, name : "asd"}];
newPlayerForm = new FormGroup({
  firstName : new FormControl(""),
  lastName : new FormControl(""),
  position : new FormControl(""),
  team : new FormControl("")
})

addNewPlayer(){
  console.log(this.newPlayerForm.value)
}
populateTeamOptions(): void{

}
populatePositionOptions(): void{

}



// private String firstname;
//     private String lastname;

//     @Enumerated(EnumType.STRING)
//     private PlayerPositions position;

//     @ManyToOne
//     @JoinColumn(name = "team_id", referencedColumnName = "id")
//     private Team team;
}

