import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchEditDialogComponent } from './dialogs/match-edit-dialog/match-edit-dialog.component';
import { MaterialModule } from '../material/material.module';
import { NewBetDialogComponent } from './dialogs/new-bet-dialog/new-bet-dialog.component';
import { GoalsPickerComponent } from './components/goals-picker/goals-picker.component';
import { StandingComponent } from './components/standing/standing.component';
import { PersonalBetPanelComponent } from './components/personal-bet-panel/personal-bet-panel.component';

@NgModule({
  declarations: [
    MatchEditDialogComponent,
    NewBetDialogComponent,
    GoalsPickerComponent,
    StandingComponent,
    PersonalBetPanelComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [StandingComponent, GoalsPickerComponent, PersonalBetPanelComponent],
})
export class SharedModule {}
