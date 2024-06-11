import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/services/user/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    user: UserModel | undefined;
    subs: Subscription[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.subs.push(this.userService.getUserProfile().subscribe((user: UserModel) => {
            if (user.bets == undefined) {
                user.bets = [];
            }
            this.user = user;
        }));
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
