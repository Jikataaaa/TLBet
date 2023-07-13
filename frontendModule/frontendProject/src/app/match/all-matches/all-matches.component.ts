import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { MatchEditDialogComponent } from 'src/app/shared/dialogs/match-edit-dialog/match-edit-dialog.component';
import { NewBetDialogComponent } from 'src/app/shared/dialogs/new-bet-dialog/new-bet-dialog.component';
import { Match } from 'src/app/shared/interfaces/Match';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
  matches!: Match[];
  matchesCount!: Number;

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    if (role == 'ADMIN') {
      return true;
    }
    return false;
  }
  constructor(private matchService: MatchService, private dialog: MatDialog) {}

  async ngOnInit() {
    await this.populateTableData();
  }

  async populateTableData() {
    const matches = await this.matchService.getAllMatches();
    const data = await lastValueFrom(matches);
    this.matches = data;
    this.matchesCount = this.matches.length;
  }

  openEditMatchDialog(match: Match) {
    const dialogRef = this.dialog.open(MatchEditDialogComponent, {
      // hasBackdrop : false,
      data: {
        id: match.id,
        homeTeamId: match.homeTeamId,
        homeTeam: match.homeTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeamId: match.awayTeamId,
        awayTeam: match.awayTeam,
        awayTeamGoals: match.awayTeamGoals,
        startTime: match.startTime,
        tournamentId: match.tournamentId,
        tournamentName: match.tournamentName,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.populateTableData());
  }
  openCreateBetDialog(match: Match) {
    const dialogRef = this.dialog.open(NewBetDialogComponent, {
      data: {
        matchId: match.id,
        homeTeamName: match.homeTeam,
        awayTeamName: match.awayTeam,
        startTime: match.startTime,
      },
    });
  }
}
