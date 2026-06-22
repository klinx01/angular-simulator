import { inject, Injectable, OnInit } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/ILoginAuth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authApiService: AuthApiService = inject(AuthApiService);
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private authUserSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authUser$: Observable<IAuthUser | null> = this.authUserSubject.asObservable();

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  processLogin(userData: ILogin): void {
    this.authApiService.addUser(userData).pipe(
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

  checkAuthStatus(): Observable<IAuthUser | null> {
    const authTokens: IAuthResponse | null = this.localStorageService.getValue<IAuthResponse>('authTokens');
    
    if (authTokens) {
      return this.authApiService.getCurrentUser().pipe(
        tap((res: IAuthUser) => {
          this.authUserSubject.next(res);
        })
      )
    } else {
        this.authUserSubject.next(null);
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
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
