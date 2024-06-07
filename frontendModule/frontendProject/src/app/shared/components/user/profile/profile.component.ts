import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { BetService } from 'src/app/services/bet/bet.service';
import { UserService } from 'src/app/services/user/user.service';
import { PersonalBet } from 'src/app/shared/interfaces/PersonalBet';
import { User } from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  bets!: PersonalBet[];
  user: User | undefined;

  constructor(private betService: BetService, private userService: UserService) {}

  async ngOnInit() {
    await this.populateBets();
    await this.populateUser();
  }

  async populateBets() {
    const username = localStorage.getItem('username');
    const data = this.betService.getAllBetsByUsername(username ? username : '');

    const bets = await lastValueFrom(data);

    this.bets = bets;
  }

  async populateUser() {
    const username = localStorage.getItem('username');
    const data = this.userService.getUserByUsername(username ? username : '');

    const user = await lastValueFrom(data);

    this.user = user;
  }
}
