import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PostApiService } from '../posts/services/post-api.service';
import { IPost } from './interfaces/IPost';

export const postDetailResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postId: string = route.paramMap.get('id')!;
  const postApiServive: PostApiService = inject(PostApiService);
  return postApiServive.getPostById(postId);
};
