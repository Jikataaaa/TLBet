import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatchModule } from 'src/app/components/match/match.module';
import { TournamentWinnerModule } from 'src/app/components/tournament-winner/tournament-winner.module';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../../shared.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingRoundsMenuComponent } from './ranking/ranking-rounds-menu/ranking-rounds-menu.component';
import { RankingComponent } from './ranking/ranking.component';
import { RoundRankingComponent } from './ranking/round-ranking/round-ranking.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        RankingComponent,
        ProfileComponent,
        LoginFormComponent,
        UserDetailComponent,
        RoundRankingComponent,
        RankingRoundsMenuComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MatchModule,
        RouterModule,
        TournamentWinnerModule
    ],
    providers: [
        UserService
    ]

})
export class UserModule { }
