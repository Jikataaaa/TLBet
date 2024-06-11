import { Component, Input } from '@angular/core';
import { PersonalBetModel } from 'src/app/services/user/models/personalBet.model';

@Component({
  selector: 'app-personal-bet-panel',
  templateUrl: './personal-bet-panel.component.html',
  styleUrls: ['./personal-bet-panel.component.scss'],
})
export class PersonalBetPanelComponent {
  @Input()
  bets!: PersonalBetModel[];
}
