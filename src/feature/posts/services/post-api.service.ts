import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { IPostResponse } from '../interfaces/IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private http = inject(HttpClient);

  getPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${postId}`);
  }

  updatePost(updatedPost: IPost): Observable<IPost> {
    return this.http.put<IPost>(`https://dummyjson.com/posts/${updatedPost.id}`, updatedPost);
  }

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  }

  addPost(createdPost: IPost): Observable<IPost> {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', createdPost);
  }
}
