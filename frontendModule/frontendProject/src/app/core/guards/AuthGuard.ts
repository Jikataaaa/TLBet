import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

export const AuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);

    const { role } = route.data;

    //checking the authentication
    let success: boolean = await lastValueFrom(userService.verifyAuthentication());

    if (!success) {
        localStorage.clear();
        return router.navigate(['user/login']);
    }

    //checking roleAccess
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username && role) {
        success = await lastValueFrom(userService.getRoleAccess(token, username, role));
        if (!success) {
            localStorage.clear();
            return router.navigate(['user/login']);
        }
    }
    else {
        localStorage.clear();
        return router.navigate(['user/login']);
    }

    return true;
};