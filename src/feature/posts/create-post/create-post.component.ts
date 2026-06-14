import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostApiService } from '../post-api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private postApiService: PostApiService = inject(PostApiService);

   postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    body: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    tags: [[], [Validators.minLength(2), Validators.maxLength(100)]],
    likes: ['', [Validators.required, Validators.maxLength(8)]],
    dislikes: ['', [Validators.required, Validators.maxLength(8)]],
    views: ['', [Validators.required, Validators.maxLength(9)]],
    userId: ['', [Validators.required, Validators.max(99)]]
  })

  onSubmit(): void {
    if (this.postForm.invalid) {
      return
    }

    this.postApiService.addPost(this.postForm.value).pipe(
      tap(() => this.router.navigate(['/posts']))
    ).subscribe();
  }

  onBack(): void {
    this.router.navigate(['/posts']);
  }

}