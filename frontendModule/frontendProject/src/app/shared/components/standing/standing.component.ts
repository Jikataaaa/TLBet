import { Component, Input } from '@angular/core';
import { Ranking } from '../../interfaces/Ranking';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent {

  @Input() ranking! : Ranking[];

  

}
