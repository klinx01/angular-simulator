import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { IToken } from '../interfaces/IToken';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthUser } from '../interfaces/IAuthUser';
import { ILogin } from '../interfaces/ILogin';
import { APP_CONFIG } from '../../../app/tokens/app-config.token';
import { IAppConfig } from '../../../interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();
  private appConfig: IAppConfig = inject(APP_CONFIG);

  signIn(userData: ILogin): void {
    this.authApiService.signIn(userData, this.appConfig.sessionTimeout)
      .pipe(
        tap((res: IToken) => {
          const authTokens: IToken = {
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          };
          this.localStorageService.setValue<IToken>('authTokens', authTokens);
        }),
        switchMap(() => {
          return this.checkAuthStatus();
        }),
        tap(() => this.router.navigate([''])),
      )
      .subscribe();
  }

  checkAuthStatus(): Observable<IAuthUser | null> {
    const authTokens: IToken | null = this.localStorageService.getValue<IToken>('authTokens');

    if (authTokens) {
      return this.authApiService.getCurrentUser().pipe(
        tap((res: IAuthUser) => {
          this.authUserSubject.next(res);
        }),
        catchError(() => {
          this.authUserSubject.next(null);
          return of(null);
        }),
      );
    } else {
      this.authUserSubject.next(null);
      return of(null);
    }
  }

  refreshToken(): Observable<IToken> {
    const tokens: IToken | null = this.localStorageService.getValue<IToken>('authTokens');
    if (!tokens) {
      return throwError((err: HttpErrorResponse) => err);
    }
    return this.authApiService
      .refreshToken(tokens, this.appConfig.sessionTimeout)
      .pipe(tap((res: IToken) => this.localStorageService.setValue<IToken>('authTokens', res)));
  }

  logout(): void {
    this.localStorageService.removeValue('authTokens');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
