import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { MatchService } from 'src/app/services/match/match.service';
import { NewBetDialogComponent } from 'src/app/shared/dialogs/new-bet-dialog/new-bet-dialog.component';
import { BetMatch } from 'src/app/shared/interfaces/BetMatch';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.scss']
})
export class NewBetComponent implements OnInit {
  dataSource : BetMatch[] = [];
  displayedColumns: string[] = [
    'homeTeam',
    'awayTeam',
    'startTime',
    'tournamentName',
    'round',
    'actions'
  ];

  constructor(private matchService: MatchService, private dialog : MatDialog){
   
  }
  async ngOnInit() {
    await this.populateTableData();
  }
async populateTableData(){
  const matches = this.matchService.getAllBetMatches();
    const data = await lastValueFrom(matches);
    this.dataSource = data;
}
onClick(match: BetMatch){
  const dialogRef = this.dialog.open(NewBetDialogComponent, {
    data:{
      matchId : match.id,
      homeTeamName: match.homeTeam,
      awayTeamName: match.awayTeam,
      startTime: match.startTime
    }
  })
}


}
