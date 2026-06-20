import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILogin } from '../interfaces/ILoginAuth';
import { IPostResponse } from '../../posts/interfaces/IPostResponse';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IAuthState } from '../interfaces/IAuthState';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);

  authPost(auth: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/login', auth);
  }
  
  getCurrentUser(): Observable<IAuthState> {
    return this.http.get<IAuthState>('https://dummyjson.com/auth/me');
  }

}
