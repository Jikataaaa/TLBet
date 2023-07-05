import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../services/match/match.service';
import { NewMatchComponent } from './new-match/new-match.component';
import { MaterialModule } from '../material/material.module';
import { AllMatchesComponent } from './all-matches/all-matches.component';
import { GoalsPickerComponent } from '../shared/components/goals-picker/goals-picker.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NewMatchComponent,
    AllMatchesComponent
  ],
  imports: [
    CommonModule, MaterialModule, SharedModule
  ], providers: [
    MatchService
  ]
})
export class MatchModule { }
