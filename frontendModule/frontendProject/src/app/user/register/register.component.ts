import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")

  })

  constructor(private service : UserService, private router: Router){
    
  }

  register(){
    this.service.register(this.registerForm);
    this.router.navigate(["/"])
  }
  


 
}
