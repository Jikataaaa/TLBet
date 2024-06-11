import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RoundComponent } from './round/round.component';
import { RoundsComponent } from './rounds/rounds.component';
import { RoundService } from './services/round.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        RoundComponent,
        RoundsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ], providers: [
        RoundService
    ]
})
export class RoundModule { }
