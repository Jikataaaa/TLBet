import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  generalRanking!: Ranking[];
  lastRoundRanking!: Ranking[];
  currentYearRanking!: Ranking[];

  constructor(private router: Router, private rankingService: RankingService) {}

  async ngOnInit() {
    await this.populateGeneralRanking();
    // await this.populateLastRanking();
    // await this.populateCurrentYearRanking();
  }

  async populateGeneralRanking() {
    const ranking = this.rankingService.getGeneralRanking();
    const data = await lastValueFrom(ranking);
    this.generalRanking = data;
  }

  async populateLastRanking() {
    const ranking = this.rankingService.getLastRoundRanking();
    const data = await lastValueFrom(ranking);
    this.lastRoundRanking = data;
  }

  async populateCurrentYearRanking() {
    const ranking = this.rankingService.getCurrentYearRanking();
    const data = await lastValueFrom(ranking);
    this.currentYearRanking = data;
  }
}
