import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostData } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  getPosts(): Observable<IPostData> {
    return this.http.get<IPostData>('https://dummyjson.com/posts');
  }

  getPostsById(postId: string | null): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${ postId }`);
  }

  putUpdatePost(postId: string | null, updatePost: IPost): Observable<IPost> {
    return this.http.put<IPost>(`https://dummyjson.com/posts/${ postId }`, updatePost)
  }

  getPostsPaginator(limit: number, skip: number): Observable<IPostData> {
    return this.http.get<IPostData>(`https://dummyjson.com/posts?limit=${ limit }&skip=${ skip }`)
  }

  addPost(createdPost: IPost): Observable<IPost> {
    return this.http.post<IPost>('https://ddummyjson.com/posts/add', createdPost)
  }

}
