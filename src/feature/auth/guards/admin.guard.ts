import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { take, map } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { AuthService } from '../services/auth.service';
import { Role } from '../../../enums/Role';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
    return authService.authUser$.pipe(
      take(1),
      map((user: IAuthUser | null) => {
        if (!user) {
           return router.parseUrl('/login');
        }

        return user.role === Role.ADMIN ? true : router.parseUrl('');
      })
    )
};
