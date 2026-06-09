import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from './interfaces/IPost';
import { PostApiService } from './post-api.service';
import { IPostResponse } from './interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private router: Router = inject(Router);
  private postApiService: PostApiService = inject(PostApiService);

  private postsSubject: BehaviorSubject<IPost[] | null> = new BehaviorSubject<IPost[] | null>(null);
  posts$: Observable<IPost[] | null> = this.postsSubject.asObservable();
  skip: number = 0;
  limit: number = 10;
  totalRecords: number = 0;

  getPosts(): IPost[] | null {
    return this.postsSubject.getValue();
  }

  deletePost(id: number): void {
     const posts: IPost[] | null = this.getPosts();
     const updatedPosts: IPost[] | undefined = posts?.filter((p: IPost) => p.id !== id) ?? [];
     this.postsSubject.next(updatedPosts);
  }

  loadPosts(): void {
    this.postsSubject.next(null);
    this.postApiService.getPosts(this.limit, this.skip).pipe(
      tap((res: IPostResponse) => {
          this.postsSubject.next(res.posts),
          this.totalRecords = res.total;
        }
      )
    ).subscribe()
  }

  updatePost(postId: number, formEditedData: IPost): void {
    this.postApiService.updatePost(postId.toString(), {...formEditedData, id: postId}).pipe(
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

}
