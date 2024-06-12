import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoalsPickerComponent } from '../components/goals-picker/goals-picker.component';
import { MatchProcessComponent } from '../components/match-process/match-process.component';
import { StandingComponent } from '../components/standing/standing.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import { DebouncedClickDirective } from './directives/debounce-click.directive';
import { TLTooltipDirective } from './directives/tl-tooltip-directive';
import { StatusPipe } from './pipes/match-status.pipe';


@NgModule({
    declarations: [
        GoalsPickerComponent,
        StandingComponent,
        MatchProcessComponent,
        ConfirmDialogComponent,
        DebouncedClickDirective,
        TLTooltipDirective,
        StatusPipe
    ],
    imports: [CommonModule, MaterialModule, RouterModule],
    exports: [GoalsPickerComponent, MatchProcessComponent, StandingComponent,
        DebouncedClickDirective,
        TLTooltipDirective,
        StatusPipe],
    providers: [
        DebouncedClickDirective,
        TLTooltipDirective,
        StatusPipe
    ],
})
export class SharedModule { }
