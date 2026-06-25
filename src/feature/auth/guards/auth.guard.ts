import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap, of, catchError, tap, take } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { IAuthUser } from '../interfaces/IAuthUser';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router: Router = inject(Router);

  return authService.authUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user) {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  )
};