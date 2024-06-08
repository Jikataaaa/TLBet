import { Component, OnInit } from '@angular/core';
import { TeamModel } from '../models/team.model';
import { LeagueModel } from '../../league/model/league.model';
import { TeamService } from '../services/team.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
    data: TeamModel[] = [];
    league!: LeagueModel;

    displayedColumns: string[] = ['id', 'name', 'actions'];

    constructor (private router: Router,
        private dialog: MatDialog,
        private teamService: TeamService) {
        this.league = history.state.league;
    }

    ngOnInit(): void {
        if (!history.state.league) {
            this.router.navigate(['/admin/leagues']);
        } else {
            this.teamService.getAllByLeagueId(this.league.id).subscribe((data) => {
                this.data = data;
            });
        }
    }

    back(): void {
        this.router.navigate(['/admin/leagues']);
    }

    addTeam(): void {
        this.router.navigate(['/admin/team'], { state: { league: this.league } });
    }

    editTeam(team: TeamModel): void {
        this.router.navigate(['/admin/team'], { state: { team, league: this.league } });
    }

    deleteTeam(team: TeamModel): void {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Изтриване`,
                message: 'Сигурни ли сте, че желаете да изтриете избрания запис'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.teamService.deleteTeam(team.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id != team.id);
                });
            }
        });
    }
}