import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Ranking } from 'src/app/shared/interfaces/Ranking';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  generalRanking! : Ranking[];
  lastRoundRanking! : Ranking[];
  currentYearRanking! : Ranking[];
  constructor(private router : Router, private rankingService : RankingService){

  }
 async ngOnInit() {
 await this.populateGeneralRanking();
 await this.populateLastRanking();
 await this.populateCurrentYearRanking();
}

async populateGeneralRanking(){
  this.rankingService.getGeneralRanking().subscribe(response => this.generalRanking = response)
}
async populateLastRanking(){
  this.rankingService.getLastRoundRanking().subscribe(response => this.lastRoundRanking = response)
}
async populateCurrentYearRanking(){
  this.rankingService.getCurrentYearRanking().subscribe(response => this.currentYearRanking = response)

}


}
