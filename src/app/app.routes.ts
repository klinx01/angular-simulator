import { Routes } from '@angular/router';
import { postDetailResolver } from '../feature/posts/post-detail.resolver';
import { authGuard } from '../feature/auth/guards/auth.guard';
import { adminGuard } from '../feature/auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../user-page/user-page.component').then((m) => m.UserPageComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('../feature/posts/post-list/post-list.component').then(
            (m) => m.PostsListComponent,
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'posts/create',
        loadComponent: () =>
          import('../feature/posts/create-post/create-post.component').then(
            (m) => m.CreatePostComponent,
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('../feature/posts/post-detail/post-detail.component').then(
            (m) => m.PostDetailComponent,
          ),
        canActivate: [adminGuard],
        resolve: {
          postDetail: postDetailResolver,
        },
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../feature/auth/auth-login/auth-login.component').then((m) => m.AuthLoginComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
