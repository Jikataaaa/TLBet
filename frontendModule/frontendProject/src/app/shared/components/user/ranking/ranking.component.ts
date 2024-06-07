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

    constructor(private router: Router, private rankingService: RankingService) { }

    async ngOnInit() {
        this.generalRanking = await lastValueFrom(this.rankingService.getGeneralRanking());
    }
}
