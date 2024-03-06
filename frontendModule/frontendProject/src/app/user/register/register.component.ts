import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
    username: new FormControl("", [Validators.required]),
    // emailFormControl: new FormControl("",[ Validators.email, Validators.required]),
    password: new FormControl("",[Validators.required]),
    repassword: new FormControl("", [Validators.required]),
  });

  constructor(private service : UserService, private router: Router){ }

  register(){
    const password = this.registerForm.get('password');
    const repassword = this.registerForm.get('repassword');

    // todo - add more validation and error handling
    if (password?.value !== repassword?.value) {
      console.error('Password and repassword do not match');
      return;
    }

    this.service.register(this.registerForm);
    this.router.navigate(["/"])
  }
}
