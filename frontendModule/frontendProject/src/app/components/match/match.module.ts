import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MatchService } from 'src/app/services/match/match.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { NewMatchComponent } from './new-match/new-match.component';


@NgModule({
    declarations: [
        NewMatchComponent,
        AllMatchesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule
    ], providers: [
        MatchService
    ]
})
export class MatchModule { }
