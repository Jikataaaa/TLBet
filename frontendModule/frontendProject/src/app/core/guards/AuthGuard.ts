import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService, private router: Router){

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const {needAuthentication, failedAuthenticatonUrl, needAdminRole} = route.data;
        const isAuthenticated = typeof needAuthentication == 'boolean' && needAuthentication == this.userService.isLoged;
        const isAdmin = typeof needAdminRole == 'boolean' && needAdminRole == this.userService.isAdmin;
        if(isAdmin && isAuthenticated){
           return true;
        }
        if(!isAdmin && isAuthenticated){
            return this.router.parseUrl('/home');
        }


        
        if(typeof needAuthentication == 'boolean' && needAuthentication == this.userService.isLoged){
            return true;
        }
        let redirectUrl = failedAuthenticatonUrl;
        if(needAuthentication){
            const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`, '');
            redirectUrl += `?redirectUrl=${loginRedirectUrl}`;
        }


        return this.router.parseUrl(redirectUrl || '/login');
    }

}