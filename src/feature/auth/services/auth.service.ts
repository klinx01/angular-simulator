import { inject, Injectable, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ILoginAuth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthState } from '../interfaces/IAuthState';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private authSubject: BehaviorSubject<IAuthState | null> = new BehaviorSubject<IAuthState | null>(null);
  auth$: Observable<IAuthState | null> = this.authSubject.asObservable();
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.checkAuthStatus().subscribe()
  }
  
  authLogin(formValue: ILogin): void {
    this.authApiService.authPost(formValue).pipe(
      tap((res: IAuthResponse) => { 
        const authTokens: IAuthResponse = { accessToken: res.accessToken, refreshToken: res.refreshToken}
        this.localStorageService.setValue<IAuthResponse>('authTokens', authTokens);
      }),
      switchMap(() => {
        this.router.navigate([''])
        return this.checkAuthStatus();
      }),
    ).subscribe();
  }

  checkAuthStatus(): Observable<IAuthState | null> {
    const authTokens: IAuthResponse | null = this.localStorageService.getValue<IAuthResponse>('authTokens');
    
    if (authTokens) {
      return this.authApiService.getCurrentUser().pipe(
        tap((res: IAuthState) => {
          this.authSubject.next(res);
        })
      )
    } else {
        this.authSubject.next(null);
        return of(null); 
      }
  }

  refreshToken(): Observable<IAuthResponse> {
    const tokens: IAuthResponse | null = this.localStorageService.getValue<IAuthResponse>('authTokens');
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/refresh', { refreshToken: tokens?.refreshToken }).pipe(
      tap((res: IAuthResponse) => this.localStorageService.setValue<IAuthResponse>('authTokens', res))
    );
  }

  logout(): void {
    this.localStorageService.removeValue('authTokens');
    this.authSubject.next(null);
    this.router.navigate(['/login']);
  }

}
