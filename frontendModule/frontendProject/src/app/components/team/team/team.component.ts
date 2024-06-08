import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { LeagueModel } from '../../league/model/league.model';
import { TeamModel } from '../models/team.model';
import { TeamService } from '../services/team.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
    teamForm!: FormGroup;
    team: TeamModel | null = null;
    league: LeagueModel | null = null;

    constructor (private fb: FormBuilder,
        private router: Router,
        private teamService: TeamService,
        private snackBar: SnackbarService) { }

    ngOnInit(): void {
        this.team = history.state.team;
        this.league = history.state.league;

        this.teamForm = this.fb.group({
            id: [this.team?.id],
            name: [this.team?.name, Validators.required],
            imageUrl: [this.team?.imageUrl],
            leagueId: [this.team?.leagueId]
        });
    }

    back(): void {
        this.router.navigate(['/admin/teams'], { state: { league: this.league } });
    }

    onSubmit(): void {
        if (this.teamForm.valid) {
            const updatedTeam = this.teamForm.value as TeamModel;
            debugger;
            updatedTeam.leagueId = this.league!.id!;
            if (updatedTeam.id) {
                this.teamService.edit(updatedTeam).subscribe(() => {
                    this.snackBar.openSuccess('Данните са актуализирани успешно!');
                    this.router.navigate(['/admin/teams'], { state: { league: this.league } });
                });
            }
            else {
                this.teamService.add(updatedTeam).subscribe(() => {
                    this.snackBar.openSuccess('Успешно добавен запис!');
                    this.router.navigate(['/admin/teams'], { state: { league: this.league } });
                });
            }
        }
    }
}
