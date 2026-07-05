import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable, tap, combineLatest, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { LocalStorageService } from '../services/local-storage.service';
import { PluralPipe } from '../pipe/plural.pipe';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent, PluralPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  filterSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  users$: Observable<IUser[]> = this.userService.users$;

  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.filterSubject$]).pipe(
    map(([users, filter]: [IUser[], string]) => {
      if (!filter) {
        return users;
      }
      return users.filter((u: IUser) => u.name.toLowerCase().includes(filter.toLowerCase()));
    }),
  );

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  onFilter(value: string): void {
    this.filterSubject$.next(value);
  }

}
