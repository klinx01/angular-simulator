import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { AuthService } from '../services/auth.service';
import { IToken } from '../interfaces/IToken';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const injector: Injector = inject(Injector);

  function addHttpHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    })
  }

  const authTokens: IToken | null = localStorageService.getValue<IToken>('authTokens');
  if (!authTokens?.accessToken) {
    return next(req);
  } else {
    const cloneReq: HttpRequest<unknown> = addHttpHeader(req, authTokens.accessToken);
    return next(cloneReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          const authService = injector.get(AuthService);
          return authService.refreshToken().pipe(
            switchMap(() => {
              const newToken: IToken | null = localStorageService.getValue<IToken>('authTokens');
              if (!newToken) {
                return throwError((err: HttpErrorResponse) => err);
              }
              const newReq: HttpRequest<unknown> = addHttpHeader(req, authTokens.accessToken);
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
