import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-page',
  imports: [AsyncPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {

  userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
     this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => {
          this.userService.setUsers(users)
        })
      ).subscribe()
  }

}
