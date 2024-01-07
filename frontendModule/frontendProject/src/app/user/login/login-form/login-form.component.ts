import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  hide: boolean = true;

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")

  })

  constructor(private service : UserService, private router: Router){
  }

  login(){
    this.service.login(this.loginForm);
    this.router.navigate(["/"])
  }
}
