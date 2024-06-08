import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BetService } from 'src/app/services/bet/bet.service';
import { lastValueFrom } from 'rxjs';
import { PersonalBet } from 'src/app/shared/interfaces/PersonalBet';

@Component({
    selector: 'app-detail-ranking',
    templateUrl: './detail-ranking.component.html',
    styleUrls: ['./detail-ranking.component.scss']
})
export class DetailRankingComponent implements OnInit {

    id: string | null;
    bets: PersonalBet[] = [];
    displayedColumns: string[] = ["awayTeam",
        "awayTeamGoals",
        "homeTeam",
        "homeTeamGoals",
        "tournamentName"];
    constructor (private route: ActivatedRoute, private betService: BetService) {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    async ngOnInit() {
        this.populateBetMatches();
    }

    async populateBetMatches() {
        const bets = this.betService.getAllBetsByUser((this.id as unknown) as number);
        const data = await lastValueFrom(bets);
        this.bets = data;
    }

}
