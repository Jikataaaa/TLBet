import { Component, Input } from '@angular/core';
import { PersonalBet } from '../../interfaces/PersonalBet';

@Component({
  selector: 'app-personal-bet-panel',
  templateUrl: './personal-bet-panel.component.html',
  styleUrls: ['./personal-bet-panel.component.scss'],
})
export class PersonalBetPanelComponent {
  @Input()
  bets!: PersonalBet[];
}
