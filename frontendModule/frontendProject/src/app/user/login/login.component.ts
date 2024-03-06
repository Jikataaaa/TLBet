import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  selectedTabIndex = 0;

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }
}
 