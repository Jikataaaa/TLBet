import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { LeagueComponent } from './league/league.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeagueService } from './services/league.service';

@NgModule({
    declarations: [
        LeagueComponent,
        LeaguesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
    ], providers: [
        LeagueService
    ]
})
export class LeagueModule { }
