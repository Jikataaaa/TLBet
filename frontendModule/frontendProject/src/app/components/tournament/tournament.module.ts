import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentService } from './services/tournament.service';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
    declarations: [
        TournamentComponent,
        TournamentsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
    ], providers: [
        TournamentService
    ]
})
export class TournamentModule { }
