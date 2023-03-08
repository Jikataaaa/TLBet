import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchEditDialogComponent } from './dialogs/match-edit-dialog/match-edit-dialog.component';
import { MaterialModule } from '../material/material.module';
import { NewBetDialogComponent } from './dialogs/new-bet-dialog/new-bet-dialog.component';


@NgModule({
  declarations: [
    MatchEditDialogComponent,
    NewBetDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
