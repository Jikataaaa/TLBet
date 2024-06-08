import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoundModel } from '../models/round.model';
import { TournamentModel } from '../../tournament/models/tournament.model';
import { RoundService } from '../services/round.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
    roundForm!: FormGroup;
    round: RoundModel | null = null;
    tournament: TournamentModel | null = null;

    constructor (private fb: FormBuilder,
        private router: Router,
        private roundService: RoundService,
        private snackBar: SnackbarService) { }

    ngOnInit(): void {
        this.round = history.state.round;
        this.tournament = history.state.tournament;

        this.roundForm = this.fb.group({
            id: [this.round?.id || ''],
            name: [this.round?.name || '', Validators.required],
            active: [this.round?.active || false],
            tournamentId: [this.round?.tournamentId || '']
        });
    }

    onSubmit(): void {
        if (this.roundForm.valid) {
            const updatedRound = this.roundForm.value as RoundModel;
            updatedRound.tournamentId = this.tournament!.id!;
            if (updatedRound.id) {
                this.roundService.edit(updatedRound).subscribe(() => {
                    this.snackBar.openSuccess('Данните са актуализирани успешно!');
                    this.router.navigate(['/admin/rounds'], { state: { tournament: this.tournament } });
                });
            }
            else {
                this.roundService.add(updatedRound).subscribe(() => {
                    this.snackBar.openSuccess('Успешно добавен запис!');
                    this.router.navigate(['/admin/rounds'], { state: { tournament: this.tournament } });
                });
            }
        }
    }
}