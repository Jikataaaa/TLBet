import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ActiveRound } from '../models/active-round.model';
import { RoundService } from '../services/round.service';

@Component({
    selector: 'active-round',
    template: ``,
})
export class ActiveRoundComponent implements OnInit {

    constructor (private roundService: RoundService,
        private router: Router,
        private snackBar: SnackbarService
    ) { }

    ngOnInit() {
        this.roundService.getActiveRound().subscribe({
            next: (data: ActiveRound | undefined) => {
                if (data) {
                    this.router.navigate(['/admin/matches'], { state: { roundId: data.id, tournament: data.tournament } });
                } else {
                    this.snackBar.openError('Липсва активен турнир с активен кръг!');
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.snackBar.openError('Възникна грешка при зареждането на активния кръг!');
                this.router.navigate(['/']);
            }
        });
    }
}
