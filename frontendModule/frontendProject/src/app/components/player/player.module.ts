import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from 'src/app/services/player/player.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewPlayerComponent } from './new-player/new-player.component';



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
