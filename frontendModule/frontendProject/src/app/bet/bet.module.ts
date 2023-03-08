import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetService } from '../services/bet/bet.service';
import { NewBetComponent } from './new-bet/new-bet.component';
import { MaterialModule } from '../material/material.module';
import { MatchService } from '../services/match/match.service';

@NgModule({
  declarations: [NewBetComponent],
  imports: [CommonModule, MaterialModule],
  providers: [BetService, MatchService],
})
export class BetModule {}
