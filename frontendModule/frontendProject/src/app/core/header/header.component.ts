import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  get isLoged(){
    return this.service.isLoged
  }

  constructor(private service : UserService, private router: Router, private http: HttpClient){

  }
  logout(){
    this.service.logout();
    this.router.navigate(['/home'])
  }

  demo(){
  //  let token = localStorage.getItem('token');
   
  //   this.http.get<IUser[]>("http://localhost:8080/demo/get", {
  //     headers: {
  //       'Authorization' : `Bearer ${token}`,
        
  //     },
  //     responseType : 'json'
  //   })
  //   .subscribe(response => {
  //     console.log(response[0].password)
  //   })
  }

}
