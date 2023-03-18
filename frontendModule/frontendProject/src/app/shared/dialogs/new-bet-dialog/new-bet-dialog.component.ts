import { Component, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetService } from 'src/app/services/bet/bet.service';
import { NewBetData } from '../../interfaces/NewBetData';

@Component({
  selector: 'app-new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.scss'],
})
export class NewBetDialogComponent {
  
  homeTeamGoals : number;
  awayTeamGoals : number;
  
  
  constructor(
    private dialogRef: MatDialogRef<NewBetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewBetData,
    private betService: BetService
  ) {
    this.homeTeamGoals = 0;
    this.awayTeamGoals = 0;
  }


  OnSubmit() {
    this.betService.createBet(this.homeTeamGoals, this.awayTeamGoals, this.data.matchId).subscribe(response => console.log(response));
  }

  putHomeGoals(homeGoals : number){
    this.homeTeamGoals = homeGoals;
  }
  putAwayGoals(awayGoals : number){
    this.awayTeamGoals = awayGoals;
  }
  
}
