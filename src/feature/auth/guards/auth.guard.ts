import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap, of, catchError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';

export const authGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  if (localStorageService.getValue('authTokens')) {
    return true;
  } else {
    return router.parseUrl('/login');
  }

  
};