import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  get isLoged(){
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
 

  

  constructor(private service : UserService, private router: Router){
   
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
    this.service.logout();
    this.router.navigate(['/home'])
  }
}
