import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/AuthGuard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewPlayerComponent } from './player/new-player/new-player.component';
import { NewTeamComponent } from './team/new-team/new-team.component';
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
      needAdminRole : true
    },
  },{
    path: 'player/new-player',
    component: NewPlayerComponent,
    canActivate: [AuthGuard],
    data: {
      needAuthentication: true,
      failedAuthenticatonUrl: '/user/login',
      needAdminRole : true
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
