import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private service: UserService) { }

    ngOnInit(): void {
        this.service.logout();
    }
    selectedTabIndex = 0;

    onTabChange(index: number) {
        this.selectedTabIndex = index;
    }
}
