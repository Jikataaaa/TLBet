import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoalsPickerComponent } from '../components/goals-picker/goals-picker.component';
import { MatchProcessComponent } from '../components/match-process/match-process.component';
import { PersonalBetPanelComponent } from '../components/personal-bet-panel/personal-bet-panel.component';
import { StandingComponent } from '../components/standing/standing.component';
import { MaterialModule } from '../material/material.module';
import { MatchEditDialogComponent } from './dialogs/match-edit-dialog/match-edit-dialog.component';


@NgModule({
    declarations: [
        MatchEditDialogComponent,
        GoalsPickerComponent,
        StandingComponent,
        PersonalBetPanelComponent,
        MatchProcessComponent
    ],
    imports: [CommonModule, MaterialModule],
    exports: [GoalsPickerComponent, MatchProcessComponent, StandingComponent, PersonalBetPanelComponent],
})
export class SharedModule { }
