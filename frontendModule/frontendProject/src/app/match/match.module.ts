import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../services/match/match.service';
import { NewMatchComponent } from './new-match/new-match.component';
import { MaterialModule } from '../material/material.module';
import { AllMatchesComponent } from './all-matches/all-matches.component';


@NgModule({
  declarations: [
    NewMatchComponent,
    AllMatchesComponent
  ],
  imports: [
    CommonModule, MaterialModule
  ], providers: [
    MatchService
  ]
})
export class MatchModule { }
