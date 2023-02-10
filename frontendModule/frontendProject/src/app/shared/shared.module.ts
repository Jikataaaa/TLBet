import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchEditDialogComponent } from './dialogs/match-edit-dialog/match-edit-dialog.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    MatchEditDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
