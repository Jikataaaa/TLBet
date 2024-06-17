import { Component, Input, OnInit } from '@angular/core';
import { RankingModel } from 'src/app/shared/components/user/ranking/model/ranking-model';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent implements OnInit{

  columns: string[] = ['position', 'username', 'points'];

  ngOnInit(): void {
  }

  @Input() ranking! : RankingModel[];
}
