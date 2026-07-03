import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, of, finalize } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from '../services/loader.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loaderService: LoaderService = inject(LoaderService);
  userApiService: UserApiService = inject(UserApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.userSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.userSubject.next(users);
    this.localStorageService.setValue<IUser[]>('users', users);
  }

  getUsers(): IUser[] {
    return this.userSubject.getValue();
  }

  deleteUser(id: number): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = currentUsers.filter((u: IUser) => u.id !== id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const users: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...users, user];
    this.setUsers(updatedUsers);
  }

  loadUsers(): Observable<IUser[]> {
    const users: IUser[] | null = this.localStorageService.getValue<IUser[]>('users');

    if (users && users.length > 0) {
      return of(users);
    }

    this.loaderService.showLoader();
    return this.userApiService.getUsers().pipe(finalize(() => this.loaderService.hideLoader()));
  }
}
