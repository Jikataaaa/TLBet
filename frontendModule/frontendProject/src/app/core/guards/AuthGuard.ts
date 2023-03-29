import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const { role } = route.data;

    //checking the authentication
    this.userService.verifyAuthentication().then((response) => {
      if (response == 'false') {
        localStorage.clear()
        this.router.navigate(['user/login']);
      }
    });

    //checking roleAccess
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.userService
      .getRoleAccess(token, username, role)
      .then((response) => {
        
        if (response == 'false') {
          localStorage.clear()
          this.router.navigate(['user/login']);
        }
      });
      return true;
  }
}