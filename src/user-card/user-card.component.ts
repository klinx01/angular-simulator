import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() onleDeleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  onDelete(): void {
    this.onleDeleteUser.emit(this.user);
  }

}
