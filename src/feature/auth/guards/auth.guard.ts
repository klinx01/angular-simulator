import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const token$: Observable<boolean> = authService.tokens$;

  return authService.tokens$.pipe(
    map((isLogged: boolean) => {
      if (isLogged === true) {
        return true
      } else {
        return router.parseUrl('/login');
        
      }
    })
  )
  
};
