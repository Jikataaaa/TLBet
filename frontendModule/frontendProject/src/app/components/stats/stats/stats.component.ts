import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { RankingModel } from 'src/app/shared/components/user/ranking/model/ranking-model';
import { JwtUserData } from 'src/app/shared/utils/model/jwt-user-data.model';
import { ChartModel } from '../models/chart.model';
import { CorrectMatchWinnerModel } from '../models/correct-match-winner.model';
import { ExactResultModel } from '../models/exact-result.model';
import { MostViewedUserModel } from '../models/most-viewed-user.model';
import { StatsTypeEnum } from '../models/stats-type.enum';
import { TeamPickPercentageModel } from '../models/team-pick-percentage.model';
import { StatsService } from '../services/stats.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit, AfterViewInit {
    @ViewChild('pieChartContainer', { static: false }) pieChartContainer!: ElementRef;
    public isLoading: boolean = true;
    public StatsTypeEnum = StatsTypeEnum;
    public selectedStatsType: StatsTypeEnum = StatsTypeEnum.TOURNAMENT_WINNER;
    public exactResults: RankingModel[] = [];
    public correctMatchWinners: RankingModel[] = [];
    private currentUser: JwtUserData | null = null;

    viewWidth!: number;
    viewHeight!: number;
    tournamentWinner: ChartModel[] = [];
    mostViewedUsers: ChartModel[] = [];
    showLegend = true;
    showYAxisLabel = true;

    constructor (private statsService: StatsService, private userService: UserService) { }

    ngOnInit() {
        this.currentUser = this.userService.getCurrentUser();
        this.loadStats();
    }

    ngAfterViewInit(): void {
        this.setViewDimensions();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.setViewDimensions();
    }

    changeStatsType(statsType: StatsTypeEnum) {
        if (this.selectedStatsType != statsType) {
            this.selectedStatsType = statsType;
            this.loadStats();
        }
    }

    setViewDimensions() {
        if (this.pieChartContainer) {
            const container = this.pieChartContainer.nativeElement;
            this.viewWidth = container.offsetWidth;
            this.viewHeight = container.offsetHeight;
        }
    }

    private loadStats() {
        switch (this.selectedStatsType) {
            case StatsTypeEnum.EXACT_MATCH:
                if (this.exactResults.length == 0) {
                    this.isLoading = true;
                }
                this.statsService.exactResult().subscribe((data: ExactResultModel[]) => {
                    let ranking: RankingModel[] = [];
                    const mostPoints = data[0].countExactResults;
                    for (let i = 0; i < data.length; i++) {
                        ranking.push(new RankingModel({
                            place: i + 1,
                            firstName: data[i].firstName,
                            lastName: data[i].lastName,
                            username: data[i].username,
                            points: data[i].countExactResults,
                            isFirst: data[i].countExactResults == mostPoints,
                            isCurrentUser: data[i].username == this.currentUser?.username

                        }));
                    }
                    this.exactResults = [...ranking];
                    this.isLoading = false;
                });
                break;
            case StatsTypeEnum.CORRECT_MATCH:
                if (this.correctMatchWinners.length == 0) {
                    this.isLoading = true;
                }
                this.statsService.correctMatchWinner().subscribe((data: CorrectMatchWinnerModel[]) => {
                    let ranking: RankingModel[] = [];
                    const mostPoints = data[0].countCorrectMatchWinners;
                    for (let i = 0; i < data.length; i++) {
                        ranking.push(new RankingModel({
                            place: i + 1,
                            firstName: data[i].firstName,
                            lastName: data[i].lastName,
                            username: data[i].username,
                            points: data[i].countCorrectMatchWinners,
                            isFirst: data[i].countCorrectMatchWinners == mostPoints,
                            isCurrentUser: data[i].username == this.currentUser?.username

                        }));
                    }
                    this.correctMatchWinners = [...ranking];
                    this.isLoading = false;
                });
                break;
            case StatsTypeEnum.TOURNAMENT_WINNER:
                if (this.tournamentWinner.length == 0) {
                    this.isLoading = true;
                }
                this.statsService.teamPickWinner().subscribe((data: TeamPickPercentageModel[]) => {
                    this.tournamentWinner = data.map(x => new ChartModel({
                        name: x.teamName,
                        value: x.teamPickCount
                    })).slice();
                    this.isLoading = false;
                });
                break;
            case StatsTypeEnum.MOST_VIEWED_USERS:
                if (this.mostViewedUsers.length == 0) {
                    this.isLoading = true;
                }
                this.statsService.mostViewedUsers().subscribe((data: MostViewedUserModel[]) => {
                    this.mostViewedUsers = data.map(x => new ChartModel({
                        name: x.username,
                        value: x.profileViewed
                    })).slice();
                    this.isLoading = false;
                });
                break;
        }
    }
}
