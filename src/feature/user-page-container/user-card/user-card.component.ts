import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneNumberPipe } from '../../../core/pipe/phone-number.pipe';
import { HoverWeightDirective } from '../../../core/directive/hover-weight.directive';
import { GradientBorderDirective } from '../../../core/directive/gradient-border.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumberPipe, HoverWeightDirective, GradientBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
