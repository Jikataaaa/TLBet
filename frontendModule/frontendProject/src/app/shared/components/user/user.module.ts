import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../../shared.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegisterComponent } from './register/register.component';
import { MatchesViewComponent } from 'src/app/components/match/matches-view/matches-view.component';
import { MatchModel } from 'src/app/components/match/models/match.model';
import { MatchModule } from 'src/app/components/match/match.module';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        RankingComponent,
        ProfileComponent,
        LoginFormComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MatchModule,
    ],
    providers: [
        UserService,
    ]

})
export class UserModule { }
