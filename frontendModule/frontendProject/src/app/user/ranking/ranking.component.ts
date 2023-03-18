import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from 'src/app/services/ranking/ranking.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  constructor(private router : Router, private rankingService : RankingService){

  }
 async ngOnInit() {
 await this.populateGeneralRanking();
 await this.populateLastRanking();
 await this.populateCurrentYearRanking();
}

async populateGeneralRanking(){
  this.rankingService.getGeneralRanking().subscribe(response => console.log(response))
}
async populateLastRanking(){

}
async populateCurrentYearRanking(){

}

// detailShow(id : number){
//   this.router.navigate(["/user/detail-ranking", id])
// }

}
