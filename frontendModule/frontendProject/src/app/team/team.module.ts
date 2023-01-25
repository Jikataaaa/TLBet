import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../services/team/team.service';
import { NewTeamComponent } from './new-team/new-team.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewTeamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], providers: [
    TeamService
  ]
})
export class TeamModule { }
