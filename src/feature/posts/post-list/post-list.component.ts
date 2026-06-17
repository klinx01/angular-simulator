import { Component, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { AsyncPipe } from '@angular/common';
import { PostApiService } from '../services/post-api.service';
import { SkeletonModule } from 'primeng/skeleton'
import { Router } from '@angular/router';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { IPostResponse } from '../interfaces/IPostResponse';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-posts-list',
  imports: [TableModule, AsyncPipe, SkeletonModule, ContextMenu],
  templateUrl: './post-list.component.html',
  providers: [DialogService],
  styleUrl: './post-list.component.scss',
})
export class PostsListComponent {

  postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private ref: DynamicDialogRef<PostDialogComponent> | null = null;

  posts$: Observable<IPost[]> = this.postService.posts$;
  mockData: IPost[] = Array(10).fill(1);
  selectedPost!: IPost;

  readonly menuItems: MenuItem[] = [
      { 
        label: 'Просмотреть', 
        command: () => this.redirectToDetailPost(this.selectedPost.id)
      },
      { 
        label: 'Удалить',  
        command: () => this.postService.deletePost(this.selectedPost.id)
      },
      { 
        label: 'Редактировать', 
        command: () => this.openModal()
      }
    ];

  redirectToDetailPost(id: number): void {
    this.router.navigate(['/posts/', id]);
  }

  redirectToCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

  openModal(): void {
    const postId: number = this.selectedPost.id
    this.ref = this.dialogService.open(PostDialogComponent, {
      header: 'Содержимое поста',
      width: '50vw',
      modal: true,
      draggable: false,
      data: {
        tags: this.selectedPost.tags,
        views: this.selectedPost.views,
        title: this.selectedPost.title
      }
    });
    this.ref?.onClose.pipe(
      tap((formEditedData: IPost) => {
        if (!formEditedData) {
          return
        }
        this.postService.updatePost(postId, formEditedData)
    }
    )).subscribe();
  }

  onNextPage(event: TableLazyLoadEvent): void {
    this.postService.skip = event.first ?? 0;
    this.postService.limit = event.rows ?? 10;
    this.postService.loadPosts()
  }

}

