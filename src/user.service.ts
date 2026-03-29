import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, of, finalize } from 'rxjs';
import { IUser } from './interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  loaderService: LoaderService = inject(LoaderService);

  userApiService: UserApiService = inject(UserApiService);

  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  users$: Observable<IUser[]> = this.userSubject.asObservable();

  setUsers(): void {
    this.userApiService.getUsers()
      .pipe(
        tap((users: IUser[]) => this.userSubject.next(users))
      )
      .subscribe();
  }

  getUsers(): void {
    const updatedUser: IUser[] = [...this.userSubject.getValue()];
    this.userSubject.next(updatedUser);
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.userApiService.getUsers()
    .pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('ошибка', err);
        return of([]);
      }),
      finalize(() => {
        setTimeout(() => {
          this.loaderService.hideLoader();
        }, 2000);
      })
    );
  }

}
