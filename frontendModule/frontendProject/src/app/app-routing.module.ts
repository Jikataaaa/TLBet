import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllMatchesComponent } from './match/all-matches/all-matches.component';
import { NewMatchComponent } from './match/new-match/new-match.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewPlayerComponent } from './player/new-player/new-player.component';
import { NewTeamComponent } from './team/new-team/new-team.component';
import { NewTournamentComponent } from './tournament/new-tournament/new-tournament.component';
import { DetailRankingComponent } from './user/detail-ranking/detail-ranking.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RankingComponent } from './user/ranking/ranking.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './core/guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
    
  },
  {
    path: 'user/register',
    component: LoginComponent,
  },
  {
    path: 'user/ranking',
    component: RankingComponent,
    canActivate: [AuthGuard],
    data: {
      role: "USER"
    },
  },
  {
    path: 'user/detail-ranking/:id',
    component: DetailRankingComponent,
    canActivate: [AuthGuard],
    data: {
      role: "USER"
    },
  }, {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: "USER"
    },
  },
  {
    path: 'team/new-team',
    component: NewTeamComponent,
    canActivate: [AuthGuard],
    data: {
      role: "ADMIN",
    },
  },
  {
    path: 'player/new-player',
    component: NewPlayerComponent,
    canActivate: [AuthGuard],
    data: {
      role: "ADMIN",
    },
  },
  {
    path: 'tournament/new-tournament',
    component: NewTournamentComponent,
    canActivate: [AuthGuard],
    data: {
      role: "ADMIN",
    },
  }, {
    path: 'match/new-match',
    component: NewMatchComponent,
    canActivate: [AuthGuard],
    data: {
      role: "ADMIN",
    },
  },{
    path: 'match/all-matches',
    component: AllMatchesComponent,
    canActivate: [AuthGuard],
    data: {
      role: "USER",
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
