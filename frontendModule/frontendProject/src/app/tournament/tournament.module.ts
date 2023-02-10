import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../services/tournament/tournament.service';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NewTournamentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], providers: [
    TournamentService
  ]
})
export class TournamentModule { }
