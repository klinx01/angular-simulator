import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUserAuth } from '../interfaces/IUserAuth';
import { IPostResponse } from '../../posts/interfaces/IPostResponse';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  postAuth(userData: IUserAuth): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/login', userData)
  }

  refreshToken(): Observable<IAuthResponse> {
    const token: string | null = this.localStorageService.getValue<string>('refreshToken');
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/refresh', { refreshToken: token }).pipe(
      tap((res: IAuthResponse) => this.localStorageService.setValue<string>('accessToken', res.accessToken))
    )
  }

}
