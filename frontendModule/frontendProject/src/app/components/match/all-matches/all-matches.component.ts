import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchStatusEnum } from 'src/app/components/match/models/MatchStatusEnum';
import { CommonEventsService } from 'src/app/core/common/common-events.service';
import { BetService } from 'src/app/services/bet/bet.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { NewBet } from 'src/app/shared/interfaces/NewBet';
import { BetMatchModel } from '../models/bet-match.model';
import { MatchService } from '../services/match.service';

@Component({
    selector: 'all-matches',
    templateUrl: './all-matches.component.html',
    styleUrls: ['./all-matches.component.scss'],
})
export class AllMatchesComponent implements OnInit {
    matchesCount!: Number;
    matches: BetMatchModel[] = [];
    hasPlayableMatches: boolean = false;

    constructor(
        private matchService: MatchService,
        private betService: BetService,
        private dialog: MatDialog,
        private eventService: CommonEventsService,
        private snackBar: SnackbarService
    ) {
    }

    ngOnInit() {
        this.loadAllMatches();
    }

    private loadAllMatches() {
        this.matchService.getAllMatches().subscribe((data) => {
            this.hasPlayableMatches = data.some((x) => x.status == MatchStatusEnum.PLAYABLE);
            this.matches = data;
        });
    }

    onSubmittedMatches(betMatches: BetMatchModel[]) {
        const data: BetMatchModel[] = betMatches.filter((x: BetMatchModel) => x.status === MatchStatusEnum.PLAYABLE);

        if (data.length === 0) {
            return;
        }

        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Залог`,
                message: 'Потвърдете, ако желаете да запазите вашата прогноза. Веднъж направен залог не може да бъде променен!',
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
                    this.snackBar.openSuccess('Прогнозата е успешно запазена!');
                });
            }
        });
    }

    submitMatches() {
        this.eventService.submitPlayableMatches.next();
    }
}
