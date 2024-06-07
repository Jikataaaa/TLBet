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
export class HeaderComponent implements OnInit {

  get isLogged(){
    let token = localStorage.getItem("token")
    if(token){
      return true
    }
    return false
  }

  get isAdmin(){
    let role = localStorage.getItem("role")
    if(role == "ADMIN"){
      return true
    }
    return false
  }

  constructor(
    private service : UserService,
    private router: Router,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog){
  }

  async ngOnInit() {
  //   await this.service.verifyAuthentication();
  //   let token = localStorage.getItem("token");
  //   let username = localStorage.getItem("username")
  //   let role = localStorage.getItem("role")
  //  await this.service.getRoleAccess(token, username, role!).then(response => {
  //   })
  }
  
  logout(){

    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Изход',
        message: 'Сигурни ли сте, че искате да излезете от профила си?'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if(result){
        this.service.logout();
        this.router.navigate(['/user/login']);
        this._snackbarService.openSuccess("Успешно излязохте от профила си");
      }
    })
  }
}
