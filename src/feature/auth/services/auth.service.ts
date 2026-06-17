import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { IUserAuth } from '../interfaces/IUserAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  authApiService: AuthApiService = inject(AuthApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  router: Router = inject(Router);
  tokensSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tokens$: Observable<boolean> = this.tokensSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }
  
  authLogin(formValue: IUserAuth) {
    this.authApiService.postAuth(formValue).pipe(
      tap((res: IAuthResponse) => { 
        this.localStorageService.setValue<string>('accessToken', res.accessToken);
        this.localStorageService.setValue<string>('refreshToken', res.refreshToken);
        this.checkAuthStatus();
        this.router.navigate(['']);
      })
    ).subscribe();
  }

  checkAuthStatus(): void {
    if (this.localStorageService.getValue<string>('accessToken') && this.localStorageService.getValue<string>('refreshToken')) {
      this.tokensSubject.next(true);
    } else {
      this.tokensSubject.next(false);
      }
  }

  logout(): void {
    this.localStorageService.removeValue('accessToken');
    this.localStorageService.removeValue('refreshToken');
    this.tokensSubject.next(false);
    this.router.navigate(['/login']);
  }

}
