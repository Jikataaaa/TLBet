import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoundModel } from '../models/round.model';
import { TournamentModel } from '../../tournament/models/tournament.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RoundService } from '../services/round.service';
import { concatMap } from 'rxjs';

@Component({
    selector: 'app-rounds',
    templateUrl: './rounds.component.html',
    styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
    data: RoundModel[] = [];
    tournament!: TournamentModel;

    displayedColumns: string[] = ['id', 'name', 'active', 'actions'];

    constructor (private router: Router,
        private dialog: MatDialog,
        private roundService: RoundService) {
        this.tournament = history.state.tournament;
    }

    ngOnInit(): void {
        if (!history.state.tournament) {
            this.router.navigate(['/admin/tournaments']);
        } else {
            this.roundService.getAll(this.tournament.id).subscribe((data) => {
                this.data = data;
            });
        }
    }

    back(): void {
        this.router.navigate(['/admin/tournaments']);
    }

    addRound(): void {
        this.router.navigate(['/admin/round'], { state: { tournament: this.tournament } });
    }

    editRound(round: RoundModel): void {
        this.router.navigate(['/admin/round'], { state: { round, tournament: this.tournament } });
    }

    deleteRound(round: RoundModel): void {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Изтриване`,
                message: 'Сигурни ли сте, че желаете да изтриете избрания запис'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.roundService.deleteRound(round.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id != round.id);
                });
            }
        });
    }

    setAsActive(round: RoundModel): void {
        this.roundService.setRoundActiveById(round.id).pipe(
            concatMap(() => this.roundService.getAll(this.tournament.id))
        ).subscribe((data) => {
            this.data = data;
        });
    }

    goToMatches(round: RoundModel): void {
        this.router.navigate(['/admin/matches'], { state: { roundId: round.id, tournament: this.tournament } });
    }
}