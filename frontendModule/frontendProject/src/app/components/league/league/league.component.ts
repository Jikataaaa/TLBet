import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeagueModel } from '../model/league.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { LeagueService } from '../services/league.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-league',
    templateUrl: './league.component.html',
    styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit, OnDestroy {
    subs: Subscription[] = [];
    leagueForm!: FormGroup;
    league: LeagueModel | null = null;

    constructor (private fb: FormBuilder,
        private leagueService: LeagueService,
        private router: Router,
        private snackBar: SnackbarService) { }

    ngOnInit(): void {
        this.league = history.state.league;
        this.leagueForm = this.fb.group({
            id: [this.league?.id || ''],
            name: [this.league?.name || '', Validators.required],
        });
    }

    back(): void {
        this.router.navigate(['/admin/leagues']);
    }

    onSubmit(): void {
        if (this.leagueForm.valid) {
            const updatedLeague = this.leagueForm.value as LeagueModel;
            if (updatedLeague.id) {
                this.subs.push(this.leagueService.edit(updatedLeague).subscribe(() => {
                    this.snackBar.openSuccess('Данните са актуализирани успешно!');
                    this.router.navigate(['/admin/leagues']);
                }
                ));
            }
            else {
                this.subs.push(this.leagueService.add(updatedLeague).subscribe(() => {
                    this.snackBar.openSuccess('Успешно добавен запис!');
                    this.router.navigate(['/admin/leagues']);
                }
                ));

            }
        }
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    };
}