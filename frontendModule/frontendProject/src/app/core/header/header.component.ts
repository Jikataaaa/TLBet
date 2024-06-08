import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    get isLogged() {
        let token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        return false;
    }

    get isAdmin() {
        let role = localStorage.getItem("role");
        if (role == "ADMIN") {
            return true;
        }
        return false;
    }

    constructor (
        private service: UserService,
        private router: Router,
        private _snackbarService: SnackbarService,
        private _dialog: MatDialog) {
    }

    logout() {
        const dialog = this._dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Изход',
                message: 'Сигурни ли сте, че желаете да излезете от профила си?'
            }
        });

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.service.logout();
                this.router.navigate(['/user/login']);
                this._snackbarService.openSuccess("Успешно излязохте от профила си");
            }
        });
    }
}
