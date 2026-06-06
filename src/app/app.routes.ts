import { Routes } from '@angular/router';
import { postDetailResolver } from '../feature/posts/post-detail.resolver';


export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent)
  },
  { 
    path: 'users',
    loadComponent: () => import('../user-page/user-page.component').then(m => m.UserPageComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('../feature/posts/posts-list/posts-list.component').then(m => m.PostsListComponent),
  },
  {
    path: 'posts/create',
    loadComponent: () => import('../feature/posts/create-post/create-post.component').then(m => m.CreatePostComponent)
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('../feature/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent),
    resolve: {
      postDetail: postDetailResolver
    }
  },
  { 
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
