import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../services/bet/bet.service';
import { NewBetComponent } from './new-bet/new-bet.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewBetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], providers: [BetService]
})
export class BetModule { }
