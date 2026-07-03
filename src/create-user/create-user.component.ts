import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../interfaces/IUser';
import { HoverWeightDirective } from '../directive/hover-weight.directive';
import { GradientBorderDirective } from '../directive/gradient-border.directive';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, HoverWeightDirective, GradientBorderDirective],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private fb: FormBuilder = inject(FormBuilder);

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      }),
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)],
    }),
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const user: IUser = { ...this.userForm.getRawValue(), id: Date.now() };
    this.createUser.emit(user);
  }
}
