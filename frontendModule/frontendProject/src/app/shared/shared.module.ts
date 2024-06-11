import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoalsPickerComponent } from '../components/goals-picker/goals-picker.component';
import { MatchProcessComponent } from '../components/match-process/match-process.component';
import { StandingComponent } from '../components/standing/standing.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import { DebouncedClickDirective } from './directives/debounce-click.directive';


@NgModule({
    declarations: [
        GoalsPickerComponent,
        StandingComponent,
        MatchProcessComponent,
        ConfirmDialogComponent,
        DebouncedClickDirective
    ],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [GoalsPickerComponent, MatchProcessComponent, StandingComponent,
        DebouncedClickDirective],
    providers: [
        DebouncedClickDirective
    ],
})
export class SharedModule { }
