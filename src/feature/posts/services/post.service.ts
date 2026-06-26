import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { PostApiService } from './post-api.service';
import { IPostResponse } from '../interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  skip: number = 0;
  limit: number = 10;
  totalRecords: number = 0;
  isLoading: boolean = false;

  getPosts(): IPost[] | null {
    return this.postsSubject.getValue();
  }

  deletePost(id: number): void {
     const posts: IPost[] | null = this.getPosts();
     const updatedPosts: IPost[] | undefined = posts?.filter((p: IPost) => p.id !== id) ?? [];
     this.postsSubject.next(updatedPosts);
  }

  loadPosts(): void {
    this.postApiService.getPosts(this.limit, this.skip).pipe(
      tap((res: IPostResponse) => {
        this.postsSubject.next(res.posts),
        this.totalRecords = res.total;
      })
    ).subscribe()
  }

  private updatedPostInList(updatePost: IPost): IPost[] {
    const currentPosts: IPost[] = this.postsSubject.getValue();
    return currentPosts.map((post: IPost) =>
      post.id === updatePost.id ? { ...post, ...updatePost } : post
    )
  }

  updatePost(postId: number, formEditedData: IPost): void {
  const updatedPostData: IPost = { ...formEditedData, id: postId };
  this.postApiService.updatePost(updatedPostData).pipe(
    tap((updatedPost: IPost) => {
      const currentPosts: IPost[] = this.getPosts()!;

      if (!currentPosts) {
        return;
      }

      const savedPosts: IPost[] = this.updatedPostInList(updatedPost);
      this.postsSubject.next(savedPosts);
    })
  ).subscribe();

  }

}
