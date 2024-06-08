import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMatchesComponent } from './components/match/all-matches/all-matches.component';
import { AuthGuard } from './core/guards/AuthGuard';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DetailRankingComponent } from './shared/components/user/detail-ranking/detail-ranking.component';
import { LoginComponent } from './shared/components/user/login/login.component';
import { ProfileComponent } from './shared/components/user/profile/profile.component';
import { RankingComponent } from './shared/components/user/ranking/ranking.component';
import { TournamentsComponent } from './components/tournament/tournaments/tournaments.component';
import { TournamentComponent } from './components/tournament/tournament/tournament.component';
import { RoundsComponent } from './components/round/rounds/rounds.component';
import { RoundComponent } from './components/round/round/round.component';
import { MatchesComponent } from './components/match/matches/matches.component';
import { MatchComponent } from './components/match/match/match.component';
import { LeaguesComponent } from './components/league/leagues/leagues.component';
import { LeagueComponent } from './components/league/league/league.component';
import { TeamsComponent } from './components/team/teams/teams.component';
import { TeamComponent } from './components/team/team/team.component';
import { ActiveRoundComponent } from './components/round/active-round/active-round.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/match/all-matches',
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
        path: 'admin/tournaments',
        component: TournamentsComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/tournament',
        component: TournamentComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/rounds',
        component: RoundsComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/round',
        component: RoundComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/active-round',
        component: ActiveRoundComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/matches',
        component: MatchesComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/match',
        component: MatchComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'match/all-matches',
        component: AllMatchesComponent,
        canActivate: [AuthGuard],
        data: {
            role: "USER",
        },
    },
    {
        path: 'admin/leagues',
        component: LeaguesComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/league',
        component: LeagueComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/teams',
        component: TeamsComponent,
        canActivate: [AuthGuard],
        data: {
            role: "ADMIN",
        },
    },
    {
        path: 'admin/team',
        component: TeamComponent,
        canActivate: [AuthGuard],
        data: {
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
export class AppRoutingModule { }
