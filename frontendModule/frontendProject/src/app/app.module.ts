import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchModule } from './components/match/match.module';
import { TeamModule } from './components/team/team.module';
import { TournamentModule } from './components/tournament/tournament.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/home/home.component';
import { UserModule } from './shared/components/user/user.module';
import { SharedModule } from './shared/shared.module';
import { RoundModule } from './components/round/round.module';


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
        BrowserAnimationsModule,
        RoundModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
