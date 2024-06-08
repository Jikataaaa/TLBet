import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeagueModule } from './components/league/league.module';
import { MatchModule } from './components/match/match.module';
import { RoundModule } from './components/round/round.module';
import { TeamModule } from './components/team/team.module';
import { TournamentModule } from './components/tournament/tournament.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/home/home.component';
import { UserModule } from './shared/components/user/user.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule,
        UserModule,
        SharedModule,
        MatchModule,
        TournamentModule,
        TeamModule,
        LeagueModule,
        BrowserAnimationsModule,
        RoundModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
