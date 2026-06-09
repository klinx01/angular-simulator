import { Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../interfaces/IPost';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPostDynamicDialog } from '../interfaces/IPostDynamicDialog';

@Component({
  selector: 'app-post-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss',
})
export class PostDialogComponent implements OnInit {

  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private dynamicDialogConfig: DynamicDialogConfig<IPostDynamicDialog, IPostDynamicDialog> = inject(DynamicDialogConfig<IPostDynamicDialog, IPostDynamicDialog>);
  private fb: FormBuilder = inject(FormBuilder);

  postDialogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    views: [0, [Validators.required]],
    tags: [[''], [Validators.minLength(2)]]
  });

  ngOnInit(): void {
    this.postDialogForm.patchValue({
      title: this.dynamicDialogConfig.inputValues?.title,
      views: this.dynamicDialogConfig.inputValues?.views,
      tags: this.dynamicDialogConfig.inputValues?.tags
    })
  }

  onSubmit(): void {
    this.ref.close(this.postDialogForm.value);
  }

  onClose(): void {
    this.ref.close();
  }

}