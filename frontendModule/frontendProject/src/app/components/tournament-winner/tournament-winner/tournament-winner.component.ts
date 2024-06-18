import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeamModel } from '../../team/models/team.model';
import { TournamentWinnerModel } from '../models/tournament-winner.model';
import { TournamentWinnerService } from '../services/tournament-winner.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BetTournamentWinnerModel } from '../models/bet-tournament-winner.model';

@Component({
    selector: 'tournament-winner',
    templateUrl: './tournament-winner.component.html',
    styleUrls: ['./tournament-winner.component.scss']
})
export class TournamentWinnerComponent implements OnInit {
    data: TournamentWinnerModel | undefined;
    form!: FormGroup;
    teams: TeamModel[] = [];
    isExpired = false;
    isPlayed = true;

    @Input()
    menuLoaded:boolean = true;

    displayTeamName(team?: TeamModel): string {
        return team ? team.name : '';
    }

    constructor(private tournamentWinnerService: TournamentWinnerService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: SnackbarService) {
        this.form = this.fb.group({
            winnerTeamControl: [undefined, Validators.required],
        });

    }

    async ngOnInit() {
        this.teams = await lastValueFrom(this.tournamentWinnerService.getAllTeams());
        this.data = await lastValueFrom(this.tournamentWinnerService.getWinnerBet());
        this.isExpired = this.data?.isExpired!;
        this.isPlayed = !!this.data?.team;
        this.form = this.fb.group({
            winnerTeamControl: [this.data?.team, Validators.required],
        });
        if (this.isPlayed || this.isExpired) {
            this.form.disable();
        }
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return;
        }
        const teamId = this.form.get('winnerTeamControl')!.value.id;
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Победител Евро 2024`,
                message: 'Сигурни ли сте, че желаете да потвърдите прогнозата? Веднъж запазен, залогът не може да бъде променен!',
                confirmText: 'Потвърди',
            }
        });

        dialog.afterClosed().subscribe((result: boolean) => {
            if (result) {
                const bet = new BetTournamentWinnerModel({
                    teamId: teamId,
                    tournamentId: this.data?.tournament?.id!
                });

                this.tournamentWinnerService.createTournamentBetWinner(bet).subscribe((tournament: TournamentWinnerModel) => {
                    this.data = tournament;
                    this.isExpired = this.data?.isExpired!;
                    this.isPlayed = !!this.data?.team;
                    this.form.disable();
                    this.snackBar.openSuccess('Данните са актуализирани успешно!');
                });
            }
        });

    }

    onTeamSelected(selectedTeam: TeamModel): void {
        this.form.patchValue({ winnerTeamControl: selectedTeam });
    }
}
