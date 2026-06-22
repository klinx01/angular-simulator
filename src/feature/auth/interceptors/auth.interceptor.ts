import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { AuthService } from '../services/auth.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const injector: Injector = inject(Injector);

  const authTokens: IAuthResponse | null = localStorageService.getValue<IAuthResponse>('authTokens');
  if (!authTokens?.accessToken) {
    return next(req);
  } else {
    const cloneReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ authTokens.accessToken }`
      }
    })
    return next(cloneReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          const authService = injector.get(AuthService);
          return authService.refreshToken().pipe(
            switchMap(() => {
              const newToken: IAuthResponse | null = localStorageService.getValue<IAuthResponse>('authTokens');
              if (!newToken) {
                return throwError((err: HttpErrorResponse) => err);
              }
              const newReq: HttpRequest<unknown> = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${ newToken.accessToken }`
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
