import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { JwtUserData } from 'src/app/shared/utils/model/jwt-user-data.model';

export const AuthGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);

    let requiredRole = (route.data as { role: string; } | null)?.role;
    const token: string | null = localStorage.getItem('token');
    if (!token) {
        userService.logout();
        return router.navigate(['user/login']);
    }
    
    const userData: JwtUserData | null = userService.getUserJwtData(token);

    if (!userData) {
        userService.logout();
        return router.navigate(['user/login']);
    }
    
    if (userData.expirationDate.getTime() < new Date().getTime()) {
        userService.logout();
        return router.navigate(['user/login']);
    }

    if (requiredRole && requiredRole == 'ADMIN' && userData.role != 'ADMIN') {
        userService.logout();
        return router.navigate(['user/login']);
    }

    return true;
};