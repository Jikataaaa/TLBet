import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { UserService } from 'src/app/services/user/user.service';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
import { RankingModel } from './model/ranking-model';
import { RoundModel } from 'src/app/components/round/models/round.model';
@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
    generalRanking!: RankingModel[];
    rounds: RoundModel[] = [];

    constructor(private router: Router, private rankingService: RankingService, private userService: UserService) { }

    async ngOnInit() {
        this.rankingService.getRounds().subscribe({
            next: (rounds) => {
                this.rounds = [new RoundModel({ name: 'Генерално класиране', id: -1 }), ...rounds];
            }
        });
        const currentUser = this.userService.getCurrentUser();
        const ranking: Ranking[] = await lastValueFrom(this.rankingService.getGeneralRanking());
        if (ranking.length > 0) {
            const mostPoints = ranking[0].points;
            this.generalRanking = ranking.map((rank, index) => {
                const rankingModel = new RankingModel(rank);
                rankingModel.isFirst = rank.points === mostPoints;
                rankingModel.isCurrentUser = (!!currentUser && rank.username === currentUser.username);
                return rankingModel;
            });
        }
    }
}
