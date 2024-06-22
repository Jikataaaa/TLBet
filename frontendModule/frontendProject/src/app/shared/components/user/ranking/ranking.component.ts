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
    ranking!: RankingModel[];
    rounds: RoundModel[] = [];
    roundName: string | undefined;
    isLoading: boolean = true;

    constructor (private router: Router, private rankingService: RankingService, private userService: UserService) { }

    async ngOnInit(): Promise<void> {
        this.rankingService.getGeneralRanking().subscribe({
            next: (rankings) => {
                this.fillRanking(rankings);
                this.isLoading = false;
            },
            error: (error) => {
                this.isLoading = false;
            },
        });

        this.rankingService.getRounds().subscribe({
            next: (rounds) => {
                if (rounds.length > 0) {
                    this.rounds = [new RoundModel({ name: 'Генерално класиране', id: -1 }), ...rounds];
                }
            }
        });
    }

    public async roundSelected(round: RoundModel): Promise<void> {
        this.isLoading = true;
        if (round.id === -1) {
            this.rankingService.getGeneralRanking().subscribe({
                next: (rankings) => {
                    this.fillRanking(rankings);
                    this.roundName = undefined;
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                },
            });
        }
        else {
            this.rankingService.getRankingByRound(round.id).subscribe({
                next: (rankings) => {
                    this.fillRanking(rankings);
                    this.roundName = this.rounds.find(x => x.id === round.id)?.name || '';
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                },
            });
        }
    }

    private fillRanking(ranking: Ranking[]): void {
        if (ranking.length > 0) {
            const currentUser = this.userService.getCurrentUser();
            const mostPoints = ranking[0].points;
            this.ranking = ranking.map((rank, index) => {
                const rankingModel = new RankingModel(rank);
                rankingModel.isFirst = rank.points === mostPoints;
                rankingModel.isCurrentUser = (!!currentUser && rank.username === currentUser.username);
                return rankingModel;
            });
        }
        else {
            this.ranking = [];
        }
    }
}
