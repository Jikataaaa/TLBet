import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide: boolean = true;
  hideRepass: boolean = true;
  emailRegex = RegExp(/^\S+@\S+\.\S+$/);

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    // emailFormControl: new FormControl("",[ Validators.email, Validators.required]),
    password: new FormControl("",[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    repassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });

  constructor(private service : UserService, private router: Router, private _snackBar: MatSnackBar){ }

  register(){
    const username = this.registerForm.get('username');
    const password = this.registerForm.get('password');
    const repassword = this.registerForm.get('repassword');

    if (username?.invalid || password?.invalid || repassword?.invalid) {
      return;
    }

    // todo - add more validation and error handling
    if (password?.value !== repassword?.value) {
      this.openSnackBar("Паролите не съвпадат!", "Затвори");
      return;
    }

    this.service.register(this.registerForm);
    this.router.navigate(["/"])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
