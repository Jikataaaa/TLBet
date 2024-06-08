import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LeagueModel } from '../model/league.model';
import { LeagueService } from '../services/league.service';

@Component({
    selector: 'app-leagues',
    templateUrl: './leagues.component.html',
    styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit {
    data: LeagueModel[] = [];
    displayedColumns: string[] = ['id', 'name', 'actions'];

    constructor (private leagueService: LeagueService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.leagueService.getAll().subscribe((data) => {
            this.data = data;
        });
    }

    addLeague(): void {
        this.router.navigate(['/admin/league']);
    }

    editLeague(league: LeagueModel): void {
        this.router.navigate(['/admin/league'], { state: { league } });
    }

    deleteLeague(league: LeagueModel): void {
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: `Изтриване`,
                message: 'Сигурни ли сте, че желаете да изтриете избрания запис'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.leagueService.deleteLeague(league.id).subscribe(() => {
                    this.data = this.data.filter(x => x.id != league.id);
                });
            }
        });

    }

    goToTeams(league: LeagueModel): void {
        this.router.navigate(['/admin/teams'], { state: { league } });
    }
}

