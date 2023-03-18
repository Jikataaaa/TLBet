import { Component, OnInit } from '@angular/core';
import { BetService } from 'src/app/services/bet/bet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private betService: BetService){

  }
  ngOnInit() {
    const username = localStorage.getItem("username");
  this.betService.getAllBetsByUsername(username ? username : "").subscribe(response => console.log(response));
  }

}
