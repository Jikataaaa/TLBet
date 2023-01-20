import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Injectable()
export class UserService {


  constructor(private http : HttpClient) { }

  get isLoged(): boolean{
    return localStorage.length > 0 ? true : false;
  }
  login(form : FormGroup) {
    if(form.invalid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;
    this.http.post("http://localhost:8080/api/v1/auth/login", {username, password}).subscribe(response => {
     const data = JSON.stringify(response);
     const dataObject = JSON.parse(data);
     const token = dataObject.token;
     localStorage.setItem("token", token);
     form.reset();
    });
    
  }
  register(form : FormGroup){
    if(form.invalid){
      return;
    }
    const {username, password} =form.value;
    this.http.post("http://localhost:8080/api/v1/auth/register", {username, password}).subscribe(response => {
     let data = JSON.stringify(response);
     let dataObject = JSON.parse(data);
     let token = dataObject.token;
     localStorage.setItem("token", token);
     form.reset();
    });
  }
  logout(){
    localStorage.clear();
  }
}
