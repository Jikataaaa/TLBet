import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CommonEventsService } from '../common/common-events.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAdmin: boolean = false;

    get isLogged() {
        let token = localStorage.getItem("token");
        if (token) {
            return true;
        }
        return false;
    }

    subs: Subscription[] = [];

    constructor(
        private service: UserService,
        private router: Router,
        private _snackbarService: SnackbarService,
        private commonEvents: CommonEventsService,
        private _dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.isAdmin = this.service.isAdmin();
        this.subs.push(this.commonEvents.authChanged.subscribe(() => {
            this.isAdmin = this.service.isAdmin();
        }));

    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
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
