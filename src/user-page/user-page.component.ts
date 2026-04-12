import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UserApiService } from '../user-api.service';
import { UsersFilterComponent } from "../users-filter/users-filter.component";

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent implements OnInit {

  userService: UserService = inject(UserService);
  userApiService: UserApiService = inject(UserApiService);
  
  users$: Observable<IUser[]> = this.userService.users$;
  filter!: string;
  filteredUsers$: Observable<IUser[]> = this.users$;

  onSearch(value: string): void {
    this.filter = value;
    this.filteredUsers$ = this.users$.pipe(
      map((users: IUser[]) => {
        if (!this.filter) {
          return users;
        }
        return users.filter(u => u.name.toLowerCase().includes(this.filter.toLowerCase()));
      }
    ));
  }

  deleteUser(user: IUser): void {
    const currentUsers: IUser[] = this.userService.getUsers();
    const updatedUsers: IUser[] = currentUsers.filter((u: IUser) => u.id !== user.id);
    this.userService.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const users: IUser[] = this.userService.getUsers();
    const updatedUsers: IUser[] = [...users, user];
    this.userService.setUsers(updatedUsers);
  }

  refreshUsers(): void {
    this.userApiService.getUsers().pipe(
      tap((users: IUser[]) => this.userService.setUsers(users))
    ).subscribe();
  }

  ngOnInit() {
     this.userService.loadUsers().subscribe();
  }

}
