import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RoundModel } from 'src/app/components/round/models/round.model';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { UserService } from 'src/app/services/user/user.service';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
import { RankingModel } from '../model/ranking-model';

@Component({
    selector: 'app-round-ranking',
    templateUrl: './round-ranking.component.html',
    styleUrls: ['./round-ranking.component.scss']
})
export class RoundRankingComponent implements OnInit {
    roundName = '';
    ranking: RankingModel[] = [];
    rounds: RoundModel[] = [];

    constructor(private router: Router,
        private rankingService: RankingService,
        private userService: UserService) {
    }

    async ngOnInit() {
        if (!history.state.roundId) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/user/ranking'])
            });
            return;
        }

        const currentUser = this.userService.getCurrentUser();
        this.rankingService.getRounds().subscribe({
            next: (rounds) => {
                this.rounds = [new RoundModel({ name: 'Генерално класиране', id: -1 }), ...rounds];
                this.roundName = this.rounds.find(x => x.id === history.state.roundId)?.name || '';
            }
        });
        const ranking: Ranking[] = await lastValueFrom(this.rankingService.getRankingByRound(history.state.roundId));
        if (ranking.length > 0) {
            const mostPoints = ranking[0].points;
            this.ranking = ranking.map((rank, index) => {
                const rankingModel = new RankingModel(rank);
                rankingModel.isFirst = rank.points === mostPoints;
                rankingModel.isCurrentUser = (!!currentUser && rank.username === currentUser.username);
                return rankingModel;
            });
        }
    }
}
