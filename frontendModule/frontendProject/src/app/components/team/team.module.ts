import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamService } from 'src/app/services/team/team.service';
import { NewTeamComponent } from './new-team/new-team.component';



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
