import { Component, inject, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEditPost } from '../interfaces/IEditPost';

@Component({
  selector: 'app-post-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss',
})
export class PostDialogComponent implements OnInit {

  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private dynamicDialogConfig: DynamicDialogConfig<IEditPost, IEditPost> = inject(
    DynamicDialogConfig<IEditPost, IEditPost>,
  );

  private fb: FormBuilder = inject(FormBuilder);

  postDialogForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    views: [0, [Validators.required]],
    tags: [[''], [Validators.minLength(2)]],
  });

  ngOnInit(): void {
    if (this.dynamicDialogConfig.data) {
      this.postDialogForm.patchValue(this.dynamicDialogConfig.data);
    }
  }

  onSubmit(): void {
    this.ref.close(this.postDialogForm.value);
  }

  onClose(): void {
    this.ref.close();
  }

}
