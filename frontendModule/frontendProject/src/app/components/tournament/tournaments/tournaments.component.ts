import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../services/tournament.service';
import { TournamentModel } from '../models/tournament.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    data: TournamentModel[] = [];
    displayedColumns: string[] = ['id', 'name', 'active', 'actions'];

    constructor (private tournamentService: TournamentService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.tournamentService.getAll().subscribe((data) => {
            this.data = data;
        });
    }

    addTournament(): void {
        this.router.navigate(['/admin/tournament']);
    }

    editTournament(tournament: TournamentModel): void {
        this.router.navigate(['/admin/tournament'], { state: { tournament } });
    }

    deleteTournament(tournament: TournamentModel): void {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Изтриване`,
                message: 'Сигурни ли сте, че желаете да изтриете избрания запис'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.tournamentService.deleteTournament(tournament.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id != tournament.id);
                });
            }
        });

    }

    goToRounds(tournament: TournamentModel): void {
        this.router.navigate(['/admin/rounds'], { state: { tournament } });
    }
}
