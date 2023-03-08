import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchService } from 'src/app/services/match/match.service';
import { MatchEditDialogData } from '../../interfaces/MatchEditDialogData';

@Component({
  selector: 'match-edit-dialog',
  templateUrl: './match-edit-dialog.component.html',
  styleUrls: ['./match-edit-dialog.component.scss'],
})
export class MatchEditDialogComponent implements OnInit {
  

  matchEditFrom = new FormGroup({
    homeTeam: new FormControl(''),
    homeTeamGoals: new FormControl(),
    awayTeam: new FormControl(''),
    awayTeamGoals: new FormControl(),
    startTime: new FormControl(new Date()),
    tournamentName: new FormControl(''),
  });
  constructor(
    private dialogRef: MatDialogRef<MatchEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: MatchEditDialogData,
    private matchService: MatchService
  ) {
    this.matchEditFrom.controls.homeTeam.setValue(this.data.homeTeam);
    this.matchEditFrom.controls.homeTeamGoals.setValue(this.data.homeTeamGoals);
    this.matchEditFrom.controls.awayTeam.setValue(this.data.awayTeam);
    this.matchEditFrom.controls.awayTeamGoals.setValue(this.data.awayTeamGoals);
    this.matchEditFrom.controls.startTime.setValue(this.data.startTime);
    this.matchEditFrom.controls.tournamentName.setValue(
      this.data.tournamentName
    );
  }
  ngOnInit(): void {}

  editMatch() {
    this.matchService
      .editMatch(
        this.matchEditFrom,
        this.data.id,
        this.data.homeTeamId,
        this.data.awayTeamId,
        this.data.tournamentId
      )
      .subscribe((response) => {
        console.log(response)
      });
  }
}
