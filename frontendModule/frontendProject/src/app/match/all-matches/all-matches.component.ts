import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { MatchEditDialogComponent } from 'src/app/shared/dialogs/match-edit-dialog/match-edit-dialog.component';
import { Match } from 'src/app/shared/interfaces/Match';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
  dataSource: Match[] = [];
  displayedColumns: string[] = [
    'homeTeam',
    'homeTeamGoals',
    'awayTeam',
    'awayTeamGoals',
    'startTime',
    'tournamentName',
    'actions',
  ];

  constructor(private matchService: MatchService, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.populateTableData();
  }

  async populateTableData() {
    const matches = this.matchService.getAllMatches();
    const data = await lastValueFrom(matches);
    this.dataSource = data;
  }

  onClick(match: Match) {
    const dialogRef = this.dialog.open(MatchEditDialogComponent, {
     // hasBackdrop : false,
      data: {
        homeTeam: match.homeTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeam: match.awayTeam,
        awayTeamGoals: match.awayTeamGoals,
        startTime: match.startTime,
        tournamentName: match.tournamentName,
      },
    });
    
  }
}
