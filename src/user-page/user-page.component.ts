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
  
  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }
  
  userService: UserService = inject(UserService);
  userApiService: UserApiService = inject(UserApiService);

  users$: Observable<IUser[]> = this.userService.users$;
  filteredUsers$: Observable<IUser[]> = this.users$;

   onFilter(value: string): void {
    this.filteredUsers$ = this.users$.pipe(
      map((users: IUser[]) => {
        if (!value) return users;
        return users.filter(u => u.name.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  }

}