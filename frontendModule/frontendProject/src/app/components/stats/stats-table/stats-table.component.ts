import { Component, Input } from '@angular/core';
import { RankingModel } from 'src/app/shared/components/user/ranking/model/ranking-model';

@Component({
  selector: 'stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.css']
})
export class StatsTableComponent {

    columns: string[] = ['position', 'username', 'points'];

    @Input() ranking! : RankingModel[];
}
