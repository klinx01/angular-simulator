import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable, tap, combineLatest, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UserApiService } from '../user-api.service';
import { UsersFilterComponent } from "../users-filter/users-filter.component";
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {
  
  userService: UserService = inject(UserService);
  userApiService: UserApiService = inject(UserApiService);
  localStorageService: LocalStorageService = inject(LocalStorageService)

  filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  users$: Observable<IUser[]> = this.userService.users$;

  filteredUsers$: Observable<IUser[]> = combineLatest([ this.users$, this.filter$ ])
  .pipe(
    map(([users, filter]) => {
      if (!filter) return users;
      return users.filter((u: IUser) => u.name.toLowerCase().includes(filter.toLowerCase())
      );
    })
  );

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

   onFilter(value: string): void {
    this.filter$.next(value);
  }

}