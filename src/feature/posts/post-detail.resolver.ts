import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PostApiService } from './post-api.service';
import { IPost } from './interfaces/IPost';

export const postDetailResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postId: string | null = route.paramMap.get('id');
  const postApiServive: PostApiService = inject(PostApiService);
  return postApiServive.getPostsById(postId);
};
