import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, of, finalize } from 'rxjs';
import { IUser } from './interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  messageService: MessageService = inject(MessageService)
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
    this.localStorageService.setValue('users', users);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const users: IUser[] = this.localStorageService.getValue('users') as IUser[] || null;

    if (users) {
      this.userSubject.next(users);
      return of(users);
    }

    this.loaderService.showLoader();
    return this.userApiService.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Ошибка! пользователи но прогрузились');
          this.setUsers([]);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()
        )
      );
  }

}