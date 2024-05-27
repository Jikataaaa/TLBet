import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament/tournament.service';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';

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
