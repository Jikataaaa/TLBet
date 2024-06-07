import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Login } from 'src/app/services/user/models/Login';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @Output() changeTab = new EventEmitter<number>();
    hide: boolean = true;

    loginForm = new FormGroup({
        username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]) // Validators.minLength(5) shold be changed to Validators.minLength(8)
    });

    constructor(
        private service: UserService,
        private router: Router,
        private _snackbarService: SnackbarService) {
    }

    login() {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;

        if (!username || !password) {
            this._snackbarService.openWarning("Моля попълнете всички полета", "Затвори");
            return;
        }

        const login: Login = new Login({ username, password });

        this.service.login(login).pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
            this._snackbarService.openSuccess("Успешно влязохте в профила си.");
            this.router.navigate(["/"]);
        });
    }

    triggerTabChange() {
        this.changeTab.emit(1);
    }

    public ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
