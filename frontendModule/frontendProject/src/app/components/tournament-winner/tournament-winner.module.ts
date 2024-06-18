import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TournamentWinnerService } from './services/tournament-winner.service';
import { TournamentWinnerComponent } from './tournament-winner/tournament-winner.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        TournamentWinnerComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ], providers: [
        TournamentWinnerService
    ],
    exports: [
        TournamentWinnerComponent,
    ]
})
export class TournamentWinnerModule { }
