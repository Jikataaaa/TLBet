import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMatchesComponent } from './components/match/all-matches/all-matches.component';
import { NewMatchComponent } from './components/match/new-match/new-match.component';
import { NewPlayerComponent } from './components/player/new-player/new-player.component';
import { NewTeamComponent } from './components/team/new-team/new-team.component';
import { NewTournamentComponent } from './components/tournament/new-tournament/new-tournament.component';
import { AuthGuard } from './core/guards/AuthGuard';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DetailRankingComponent } from './shared/components/user/detail-ranking/detail-ranking.component';
import { LoginComponent } from './shared/components/user/login/login.component';
import { ProfileComponent } from './shared/components/user/profile/profile.component';
import { RankingComponent } from './shared/components/user/ranking/ranking.component';

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
