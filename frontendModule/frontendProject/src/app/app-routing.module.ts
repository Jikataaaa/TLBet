import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBetComponent } from './bet/new-bet/new-bet.component';
import { AuthGuard } from './core/guards/AuthGuard';
import { HomeComponent } from './home/home.component';
import { AllMatchesComponent } from './match/all-matches/all-matches.component';
import { NewMatchComponent } from './match/new-match/new-match.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewPlayerComponent } from './player/new-player/new-player.component';
import { NewTeamComponent } from './team/new-team/new-team.component';
import { NewTournamentComponent } from './tournament/new-tournament/new-tournament.component';
import { DetailRankingComponent } from './user/detail-ranking/detail-ranking.component';
import { LoginComponent } from './user/login/login.component';
import { RankingComponent } from './user/ranking/ranking.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
    data:{
      role: "USER"
    }
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: {
      //needAuthentication: false,
     // failedAuthenticatonUrl: '/',
      role: "USER"
    },
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    data: {
    //  needAuthentication: false,
     // failedAuthenticatonUrl: '/',
      role: "USER"
    },
  },
  {
    path: 'user/ranking',
    component: RankingComponent,
    canActivate: [AuthGuard],
    data: {
    //  needAuthentication: false,
     // failedAuthenticatonUrl: '/',
      role: "USER"
    },
  },
  {
    path: 'user/detail-ranking/:id',
    component: DetailRankingComponent,
    canActivate: [AuthGuard],
    data: {
    //  needAuthentication: false,
     // failedAuthenticatonUrl: '/',
      role: "USER"
    },
  },
  {
    path: 'team/new-team',
    component: NewTeamComponent,
    canActivate: [AuthGuard],
    data: {
     // needAuthentication: true,
    //  failedAuthenticatonUrl: '/user/login',
      role: "ADMIN",
    },
  },
  {
    path: 'player/new-player',
    component: NewPlayerComponent,
    canActivate: [AuthGuard],
    data: {
     // needAuthentication: true,
     // failedAuthenticatonUrl: '/user/login',
      role: "ADMIN",
    },
  },
  {
    path: 'tournament/new-tournament',
    component: NewTournamentComponent,
    canActivate: [AuthGuard],
    data: {
    //  needAuthentication: true,
      //failedAuthenticatonUrl: '/user/login',
      role: "ADMIN",
    },
  }, {
    path: 'bet/new-bet',
    component: NewBetComponent,
    canActivate: [AuthGuard],
    data: {
     // needAuthentication: true,
     // failedAuthenticatonUrl: '/user/login',
      role: "USER",
    },
  },{
    path: 'match/new-match',
    component: NewMatchComponent,
    canActivate: [AuthGuard],
    data: {
      //needAuthentication: true,
     // failedAuthenticatonUrl: '/user/login',
      role: "ADMIN",
    },
  },{
    path: 'match/all-matches',
    component: AllMatchesComponent,
    canActivate: [AuthGuard],
    data: {
     // needAuthentication: true,
     // failedAuthenticatonUrl: '/user/login',
      role: "ADMIN",
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
