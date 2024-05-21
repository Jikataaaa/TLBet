import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() changeTab = new EventEmitter<number>();
  hide: boolean = true;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)])

  })

  constructor(private service : UserService, private router: Router, private _snackBar: MatSnackBar){
  }

  login(){
    
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    debugger
    if (!username || !password) {
      this._snackBar.open("Моля попълнете всички полета", "Затвори",{
        duration: 2000,
      });
      return;
    }

    this.service.login(this.loginForm);
    this.router.navigate(["/"])
  }

  triggerTabChange(){
    this.changeTab.emit(1);
  }

}
