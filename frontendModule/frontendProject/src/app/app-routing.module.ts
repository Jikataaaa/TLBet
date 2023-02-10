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
import { LoginComponent } from './user/login/login.component';
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
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: {
      needAuthentication: false,
      failedAuthenticatonUrl: '/',
    },
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    data: {
      needAuthentication: false,
      failedAuthenticatonUrl: '/',
    },
  },
  {
    path: 'team/new-team',
    component: NewTeamComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
    },
  },
  {
    path: 'player/new-player',
    component: NewPlayerComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
    },
  },
  {
    path: 'tournament/new-tournament',
    component: NewTournamentComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
    },
  }, {
    path: 'bet/new-bet',
    component: NewBetComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
    },
  },{
    path: 'match/new-match',
    component: NewMatchComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
    },
  },{
    path: 'match/all-matches',
    component: AllMatchesComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole: true,
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
