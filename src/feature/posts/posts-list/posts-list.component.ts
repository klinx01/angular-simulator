import { Component, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost, IPostData } from '../IPost';
import { AsyncPipe } from '@angular/common';
import { PostApiService } from '../post-api.service';
import { SkeletonModule } from 'primeng/skeleton'
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContextMenuModule, ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';


@Component({
  selector: 'app-posts-list',
  imports: [TableModule, AsyncPipe, SkeletonModule, ContextMenu],
  templateUrl: './posts-list.component.html',
  providers: [DialogService],
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {

  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private ref: DynamicDialogRef<PostDialogComponent> | null = null;

  private postsSubject: BehaviorSubject<IPost[] | null> = new BehaviorSubject<IPost[] | null>(null);
  posts$: Observable<IPost[] | null> = this.postsSubject.asObservable();
  mockData: IPost[] = Array(10).fill(1);
  selectedPost!: IPost;
  menuItem: MenuItem[] = [];
  skip: number = 0;
  limit: number = 10;
  totalRecords: number = 0;
  
  ngOnInit(): void {
      this.menuItem = [
      { 
        label: 'Просмотреть', 
        icon: 'pi pi-fw pi-search', 
        command: () => this.onDetailPostInfo(this.selectedPost.id)
      },
      { 
        label: 'Удалить', 
        icon: 'pi pi-fw pi-times', 
        command: () => this.deletePost(this.selectedPost.id) 
      },
      { 
        label: 'Редактировать', 
        icon: 'pi pi-pencil', 
        command: () => this.openModal() 
      }
    ];
  }

  loadPosts(): void {
    this.postsSubject.next(null);
    this.postApiService.getPostsPaginator(this.limit, this.skip).pipe(
      tap((res: IPostData) => {
          this.postsSubject.next(res.posts),
          this.totalRecords = res.total;
        }
      )
    ).subscribe()
  }

  getPosts(): IPost[] | null {
    return this.postsSubject.getValue();
  }

  onDetailPostInfo(id: number): void {
    this.router.navigate(['posts/', id]);
  }

  onCreatePost(): void {
    this.router.navigate(['posts/create']);
  }
  
  deletePost(id: number): void {
     const posts: IPost[] | null = this.getPosts();
     const updatedPosts: IPost[] | undefined  = posts?.filter(p => p.id !== this.selectedPost.id) ?? [];
     this.postsSubject.next(updatedPosts);
  }

  openModal(): void {
    const postId: number = this.selectedPost.id
    this.ref = this.dialogService.open(PostDialogComponent, {
      header: 'Содержимое поста',
      width: '50vw',
      modal: true,
      inputValues: {
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
        this.postApiService.putUpdatePost(postId.toString(), {...formEditedData, id: postId}).pipe(
          tap((updatePost: IPost) => {
            const currentPosts: IPost[] | null = this.getPosts();
            if (!currentPosts) {
              return
            }
            const savedPost: IPost[] = currentPosts.map((post: IPost) => {
              if (post.id === updatePost.id) {
                return {
                  ...post, ...formEditedData
                }
              } else {
                return post
              }
            })
            this.postsSubject.next(savedPost)
          })
      ).subscribe()
    }
    )).subscribe();
  }

  onNextPage(event: TableLazyLoadEvent) {
    this.skip = event.first ?? 0;
    this.limit = event.rows ?? 10;
    this.loadPosts();
  }

}

