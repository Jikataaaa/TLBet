import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BetMatchModel } from 'src/app/components/match/models/bet-match.model';
import { MatchStatusEnum } from 'src/app/components/match/models/MatchStatusEnum';
import { MatchService } from 'src/app/components/match/services/match.service';
import { BetService } from 'src/app/services/bet/bet.service';
import { UserModel } from 'src/app/services/user/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserModel | undefined;
  matchesFormArray!: FormArray;
  form!: FormGroup;
  hasPlayableMatches: boolean = false;

  constructor(private betService: BetService, private matchService: MatchService, private userService: UserService) {
    this.matchesFormArray = new FormArray<FormGroup>([]);
    this.form = new FormGroup({
      matches: this.matchesFormArray,
    });
  }

  async ngOnInit() {
    await this.getUserProfile();
  }

  getUserProfile() {
    const data = this.userService.getUserProfile().subscribe((user) => {
      debugger
      this.user = user;
    });
  }

  private loadAllMatches() {
    this.matchService.getAllMatches().subscribe((data) => {
        this.fillForm(data);
    });1
}

fillForm(matches: BetMatchModel[]) {
    const sortedMatches = matches.sort((a, b) => {
        if (a.status === MatchStatusEnum.PLAYABLE && b.status !== MatchStatusEnum.PLAYABLE) {
            return -1;
        }
        if (a.status !== MatchStatusEnum.PLAYABLE && b.status === MatchStatusEnum.PLAYABLE) {
            return 1;
        }
        return 0;
    });

    this.hasPlayableMatches = sortedMatches.some((x) => x.status == MatchStatusEnum.PLAYABLE);

    this.matchesFormArray.clear();
    const groups: FormGroup[] = sortedMatches.map(
        (match) =>
            new FormGroup({
                match: new FormControl(match),
            })
    );
    groups.forEach((group) => this.matchesFormArray.push(group));
}
}
