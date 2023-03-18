import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { RankingComponent } from './ranking/ranking.component';
import { MaterialModule } from '../material/material.module';
import { DetailRankingComponent } from './detail-ranking/detail-ranking.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RankingComponent,
    DetailRankingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
