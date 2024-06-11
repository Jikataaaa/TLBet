import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchModule } from 'src/app/components/match/match.module';
import { MaterialModule } from 'src/app/material/material.module';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from '../../shared.module';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        RankingComponent,
        ProfileComponent,
        LoginFormComponent,
        UserDetailComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        MatchModule,
        RouterModule
    ],
    providers: [
        UserService,
    ]

})
export class UserModule { }
