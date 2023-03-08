import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})

export class RankingComponent implements OnInit {
  users : User[] = []
  displayedColumns : string [] = [
    "user",
    "actions"
  ]
  constructor(private userService: UserService, private router : Router){

  }
 async ngOnInit() {
 await this.populateUsers();
  }

 async populateUsers(){
  const users = this.userService.getAllUsers();
  const data = await lastValueFrom(users);
  this.users = data;
}

detailShow(id : number){
  this.router.navigate(["/user/detail-ranking", id])
}

}
