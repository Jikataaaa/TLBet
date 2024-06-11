import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { TeamService } from './services/team.service';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        TeamComponent,
        TeamsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ], providers: [
        TeamService
    ]
})
export class TeamModule { }
