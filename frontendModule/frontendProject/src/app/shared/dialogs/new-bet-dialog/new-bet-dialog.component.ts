import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetService } from 'src/app/services/bet/bet.service';
import { NewBetData } from '../../interfaces/NewBetData';

@Component({
  selector: 'app-new-bet-dialog',
  templateUrl: './new-bet-dialog.component.html',
  styleUrls: ['./new-bet-dialog.component.scss']
})
export class NewBetDialogComponent {

  newBetForm = new FormGroup({
    homeTeamGoals : new FormControl(''),
    awayTeamGoals : new FormControl(''),
  })


  constructor(private dialogRef: MatDialogRef<NewBetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewBetData,
    private betService: BetService){

      console.log(data)
  }
  OnSubmit(){
    this.betService.createBet(this.newBetForm, this.data.matchId).subscribe(response => console.log(response));
  }
}
