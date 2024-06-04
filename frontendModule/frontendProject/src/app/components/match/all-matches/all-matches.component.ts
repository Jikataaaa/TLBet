import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BetService } from 'src/app/services/bet/bet.service';
import { MatchService } from 'src/app/services/match/match.service';
import { Match } from 'src/app/services/match/models/Match';
import { NewBet } from 'src/app/shared/interfaces/NewBet';

@Component({
  selector: 'all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
  matchesCount!: Number;
  form!: FormGroup;
  matchesFormArray!: FormArray;

  constructor(
    private matchService: MatchService,
    private betService: BetService
  ) {
    this.matchesFormArray = new FormArray<FormGroup>([]);
    this.form = new FormGroup({
      matches: this.matchesFormArray,
    });
  }

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    if (role == 'ADMIN') {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe((data) => {
      this.fillForm(data);
    });
  }

  fillForm(matches: Match[]) {
    const groups: FormGroup[] = matches.map(
      (match) =>
        new FormGroup({
          match: new FormControl(match),
        })
    );
    groups.forEach((group) => this.matchesFormArray.push(group));
  }

  onSubmit() {
    const result: Match[] = this.matchesFormArray.value.map((x: { match: Partial<Match> | undefined; }) => new Match(x.match));
    let bets: NewBet[] = [];

    for (const bet of result) {
      bets.push(
        new NewBet({
          homeTeamGoals: bet.homeTeam.goals,
          awayTeamGoals: bet.awayTeam.goals,
          matchId: bet.id,
          username: localStorage.getItem('username')!,
        })
      );
    }
    this.betService.createBets(bets).subscribe(data => console.log(data));
  }
}
