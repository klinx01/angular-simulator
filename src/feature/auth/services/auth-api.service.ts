import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILogin } from '../interfaces/ILoginAuth';
import { IPostResponse } from '../../posts/interfaces/IPostResponse';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { LocalStorageService } from '../../../services/local-storage.service';
import { IAuthUser } from '../interfaces/IAuthUser';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);

  addUser(auth: ILogin): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>('https://dummyjson.com/auth/login', auth);
  }
  
  getCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>('https://dummyjson.com/auth/me');
  }

}
