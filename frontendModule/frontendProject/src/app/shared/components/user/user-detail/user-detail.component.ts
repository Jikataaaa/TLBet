import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { UserModel } from 'src/app/services/user/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    user: UserModel | undefined;
    subs: Subscription[] = [];
    username: string | undefined;

    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.subs.push(this.route.paramMap.pipe(
            switchMap(params => {
                const username = params.get('username');
                if (!username) {
                    this.router.navigate(['/']);
                    return []; // Return an empty observable if no username
                }
                this.username = username;
                return this.userService.getUserDetails(username);
            })
        ).subscribe((user: UserModel) => {
            if (!user) {
                this.router.navigate(['/']);
                return;
            }
            if (!user.bets) {
                user.bets = [];
            }
            this.user = user;
        }));
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
