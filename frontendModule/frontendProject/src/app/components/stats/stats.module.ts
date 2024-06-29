import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatsTableComponent } from './stats-table/stats-table.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
    declarations: [
        StatsComponent,
        StatsTableComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        RouterModule,
    ], providers: [
    ]
})
export class StatsModule { }
