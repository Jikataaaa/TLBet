import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TeamModel } from '../../team/models/team.model';
import { TeamService } from '../../team/services/team.service';
import { BetMatchModel } from '../models/bet-match.model';
import { MatchModel } from '../models/match.model';
import { MatchService } from '../services/match.service';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
    matchForm!: FormGroup;
    match: BetMatchModel | null = null;
    teams: TeamModel[] = [];
    filteredTeamsHome!: Observable<TeamModel[]>;
    filteredTeamsAway!: Observable<TeamModel[]>;

    constructor (
        private fb: FormBuilder,
        private router: Router,
        private matchService: MatchService,
        private teamService: TeamService,
        private snackBar: SnackbarService
    ) {
    }

    ngOnInit(): void {
        if (!history.state.roundId) {
            this.router.navigate(['/admin/tournaments']);
        }

        this.match = history.state.match;

        this.matchForm = this.fb.group({
            id: [this.match?.id],
            homeGoals: [this.match?.homeTeam.goals],
            awayGoals: [this.match?.awayTeam.goals],
            startTime: [this.match?.startTime, Validators.required],
            roundId: [history.state.roundId],
            homeTeam: [this.match?.homeTeam, Validators.required],
            awayTeam: [this.match?.awayTeam, Validators.required],
        });

        this.teamService.getAll().subscribe(teams => {
            this.teams = teams;
            this.setupFilters();
        });
    }

    setupFilters(): void {
        this.filteredTeamsHome = this.matchForm.get('homeTeam')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterTeams(value))
        );

        this.filteredTeamsAway = this.matchForm.get('awayTeam')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterTeams(value))
        );
    }

    displayTeamName(team?: TeamModel): string {
        return team ? team.name : '';
    }

    private _filterTeams(value: string | null | undefined): TeamModel[] {
        const filterValue = (value ?? "").toLowerCase();
        return this.teams.filter(team => team.name.toLowerCase().includes(filterValue));
    }

    onHomeTeamSelected(selectedTeam: TeamModel): void {
        this.matchForm.patchValue({ homeTeam: selectedTeam });
    }

    onAwayTeamSelected(selectedTeam: TeamModel): void {
        this.matchForm.patchValue({ awayTeam: selectedTeam });
    }

    back(): void {
        this.router.navigate(['/admin/matches'], { state: { roundId: history.state.roundId, tournament: history.state.tournament } });
    }

    onSubmit(): void {
        if (!this.matchForm.valid) {
            return;
        }
        const homeTeamId = this.matchForm.get('homeTeam')!.value.id;
        const awayTeamId = this.matchForm.get('awayTeam')?.value.id;

        if (homeTeamId === awayTeamId) {
            this.snackBar.openError('Отборите съвпадат!', 'Затвори');
            return;
        }

        const match = new MatchModel({
            id: this.matchForm.get('id')?.value,
            homeTeamGoals: this.matchForm.get('homeGoals')?.value,
            awayTeamGoals: this.matchForm.get('awayGoals')?.value,
            startTime: this.matchForm.get('startTime')?.value,
            homeTeamId: homeTeamId,
            awayTeamId: awayTeamId,
            roundId: this.matchForm.get('roundId')?.value,
        });

        if (match.id) {
            this.matchService.edit(match).subscribe(() => {
                this.snackBar.openSuccess('Данните са актуализирани успешно!');
                this.router.navigate(['/admin/matches'], { state: { roundId: match.roundId, tournament: history.state.tournament } });
            });
        } else {
            this.matchService.add(match).subscribe(() => {
                this.snackBar.openSuccess('Успешно добавен запис!');
                this.router.navigate(['/admin/matches'], { state: { roundId: match.roundId, tournament: history.state.tournament } });
            });
        }
    }
}
