import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authApiService: AuthApiService = inject(AuthApiService);
  const authService: AuthService = inject(AuthService);

  const accesToken: string | null = localStorageService.getValue<string>('accessToken');
  if (!accesToken) {
    return next(req);
  } else {
    const cloneReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accesToken}`
      }
    })
    return next(cloneReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authApiService.refreshToken().pipe(
            switchMap(() => {
              const newToken: string | null = localStorageService.getValue<string>('accessToken');
              const newReq: HttpRequest<unknown> = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              })
              return next(newReq);
            }),
            catchError((refErr: HttpErrorResponse) => {
              authService.logout()
              return throwError(() => refErr);
            })
          )
        }
        return throwError((err: HttpErrorResponse) => err);
      })
    );
  }

};
