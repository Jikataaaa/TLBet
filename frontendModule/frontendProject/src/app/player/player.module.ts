import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../services/player/player.service';
import { NewPlayerComponent } from './new-player/new-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
  
    NewPlayerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ], providers: [
    PlayerService
  ]
})
export class PlayerModule { }
