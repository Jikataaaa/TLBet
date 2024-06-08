import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TournamentModel } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
    selector: 'app-tournament',
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit, OnDestroy {
    subs: Subscription[] = [];
    tournamentForm!: FormGroup;
    tournament: TournamentModel | null = null;

    constructor (private fb: FormBuilder,
        private tournamentService: TournamentService,
        private router: Router,
        private snackBar: SnackbarService) { }

    ngOnInit(): void {
        this.tournament = history.state.tournament;
        this.tournamentForm = this.fb.group({
            id: [this.tournament?.id || ''],
            name: [this.tournament?.name || '', Validators.required],
            active: [this.tournament?.active || false]
        });
    }
    
    back(): void {
        this.router.navigate(['/admin/tournaments']);
    }

    onSubmit(): void {
        if (this.tournamentForm.valid) {
            const updatedTournament = this.tournamentForm.value as TournamentModel;
            if (updatedTournament.id) {
                this.subs.push(this.tournamentService.edit(updatedTournament).subscribe(() => {
                    this.snackBar.openSuccess('Данните са актуализирани успешно!');
                    this.router.navigate(['/admin/tournaments']);
                }
                ));
            }
            else {
                this.subs.push(this.tournamentService.add(updatedTournament).subscribe(() => {
                    this.snackBar.openSuccess('Успешно добавен запис!');
                    this.router.navigate(['/admin/tournaments']);
                }
                ));

            }
        }
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    };
}
