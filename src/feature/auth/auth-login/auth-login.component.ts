import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {

  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  authForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  })

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.authLogin(this.authForm.value);
  }

}