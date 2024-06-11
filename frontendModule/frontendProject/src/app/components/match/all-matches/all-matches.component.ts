import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatchStatusEnum } from 'src/app/components/match/models/MatchStatusEnum';
import { BetService } from 'src/app/services/bet/bet.service';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { BetMatchModel } from '../models/bet-match.model';
import { MatchService } from '../services/match.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'all-matches',
    templateUrl: './all-matches.component.html',
    styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
    matchesCount!: Number;
    form!: FormGroup;
    matchesFormArray!: FormArray;
    hasPlayableMatches: boolean = false;

    constructor(
        private matchService: MatchService,
        private betService: BetService,
        private dialog: MatDialog,
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
        this.loadAllMatches();
    }

    private loadAllMatches() {
        this.matchService.getAllMatches().subscribe((data) => {
            this.fillForm(data);
        });
    }

    fillForm(matches: BetMatchModel[]) {
        const sortedMatches = matches.sort((a, b) => {
            if (a.status === MatchStatusEnum.PLAYABLE && b.status !== MatchStatusEnum.PLAYABLE) {
                return -1;
            }
            if (a.status !== MatchStatusEnum.PLAYABLE && b.status === MatchStatusEnum.PLAYABLE) {
                return 1;
            }
            return 0;
        });

        this.hasPlayableMatches = sortedMatches.some((x) => x.status == MatchStatusEnum.PLAYABLE);

        this.matchesFormArray.clear();
        const groups: FormGroup[] = sortedMatches.map(
            (match) =>
                new FormGroup({
                    match: new FormControl(match),
                })
        );
        groups.forEach((group) => this.matchesFormArray.push(group));
    }

    onSubmit() {
        const data: BetMatchModel[] = this.matchesFormArray.value.map((x: { match: Partial<BetMatchModel> | undefined; }) => new BetMatchModel(x.match))
            .filter((x: BetMatchModel) => x.status === MatchStatusEnum.PLAYABLE);

        if (data.length === 0) {
            return;
        }

        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Залог`,
                message: 'Потвърдете ако желаете да направите залог, веднъж направен залог не може да бъде променен!',
                confirmText: 'Потвърди',
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                let bets: NewBet[] = [];
                for (const bet of data) {
                    bets.push(
                        new NewBet({
                            homeTeamGoals: bet.homeTeam.goals,
                            awayTeamGoals: bet.awayTeam.goals,
                            matchId: bet.id,
                        })
                    );
                }
                this.betService.createBets(bets).subscribe(data => {
                    this.loadAllMatches();
                });
            }
        });
    }
}
