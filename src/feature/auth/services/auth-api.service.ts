import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IToken } from '../interfaces/IToken';
import { IPostResponse } from '../../posts/interfaces/IPostResponse';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private readonly url = 'https://dummyjson.com/auth'

  signIn(auth: IAuthUser): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}/login`, auth);
  }
  
  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${this.url}/me`);
  }

}
