import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { MatchService } from './services/match.service';
import { MatchComponent } from './match/match.component';
import { MatchesComponent } from './matches/matches.component';


@NgModule({
    declarations: [
        AllMatchesComponent,
        MatchComponent,
        MatchesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
    ], providers: [
        MatchService
    ]
})
export class MatchModule { }
