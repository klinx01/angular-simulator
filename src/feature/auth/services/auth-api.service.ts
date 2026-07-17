import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken';

import { IAuthUser } from '../interfaces/IAuthUser';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly authUrl: string = 'https://dummyjson.com/auth';

  signIn(auth: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${ this.authUrl }/login`, auth);
  }

  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${ this.authUrl }/me`);
  }

  refreshToken(tokens: IToken): Observable<IToken> {
    return this.http.post<IToken>(`${ this.authUrl }/refresh`, {
      refreshToken: tokens?.refreshToken,
    });
  }

}
