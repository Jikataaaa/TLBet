import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../../shared.module';
import { DetailRankingComponent } from './detail-ranking/detail-ranking.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegisterComponent } from './register/register.component';
import { AllMatchesComponent } from 'src/app/components/match/all-matches/all-matches.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RankingComponent,
    DetailRankingComponent,
    ProfileComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    UserService,
  ]

})
export class UserModule { }
