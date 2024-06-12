import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatchModel } from '../models/match.model';
import { MatchService } from '../services/match.service';
import { BetMatchModel } from '../models/bet-match.model';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
    data: BetMatchModel[] = [];
    roundId!: number;

    displayedColumns: string[] = ['id', 'match', 'score', 'startTime', 'actions'];

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private matchService: MatchService
    ) {
        this.roundId = history.state.roundId;
    }

    ngOnInit(): void {
        if (!history.state.roundId) {
            this.router.navigate(['/admin/rounds']);
        } else {
            this.matchService.getAll(this.roundId).subscribe((data) => {
                this.data = data;
            });
        }
    }

    back(): void {
        this.router.navigate(['/admin/rounds'], { state: { tournament: history.state.tournament } });
    }

    addMatch(): void {
        this.router.navigate(['/admin/match'], { state: { roundId: this.roundId, tournament: history.state.tournament } });
    }

    editMatch(match: BetMatchModel): void {
        this.router.navigate(['/admin/match'], { state: { match, roundId: this.roundId, tournament: history.state.tournament } });
    }

    deleteMatch(match: BetMatchModel): void {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Изтриване`,
                message: 'Сигурни ли сте, че желаете да изтриете избрания запис'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.matchService.deleteMatch(match.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id != match.id);
                });
            }
        });
    }
}
