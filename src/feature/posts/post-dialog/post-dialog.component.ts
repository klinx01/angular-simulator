import { Component, inject, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss',
})
export class PostDialogComponent implements OnInit {

  private ref: DynamicDialogRef = inject(DynamicDialogRef);
  private fb: FormBuilder = inject(FormBuilder);

  @Input() tags!: string[];
  @Input() views!: number;
  @Input() title!: string;

  EditModalForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    views: [0, [Validators.required]],
    tags: [[''], [Validators.minLength(2)]]
  });

  ngOnInit(): void {
    this.EditModalForm.patchValue({
      title: this.title,
      views: this.views,
      tags: this.tags
    })
  }

  onSubmit(): void {
    this.ref.close(this.EditModalForm.value);
  }

  onClose(): void {
    this.ref.close();
  }

}