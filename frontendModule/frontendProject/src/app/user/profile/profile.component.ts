import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BetService } from 'src/app/services/bet/bet.service';
import { PersonalBet } from 'src/app/shared/interfaces/PersonalBet';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  bets!: PersonalBet[];

  constructor(private betService: BetService) {}
  async ngOnInit() {
    await this.populateBets();
  }

  async populateBets() {
    const username = localStorage.getItem('username');
    const data = this.betService.getAllBetsByUsername(username ? username : '');

    const bets = await lastValueFrom(data);

    this.bets = bets;
  }
}
