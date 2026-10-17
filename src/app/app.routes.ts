import { Routes } from '@angular/router';
import { postDetailResolver } from '../feature/posts/post-detail.resolver';
import { authGuard } from '../feature/auth/guards/auth.guard';
import { adminGuard } from '../feature/auth/guards/admin.guard';
import { productResolver } from '../feature/products/resolvers/product.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../feature/home-page/home-page.component').then((m) => m.HomePageComponent),
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadComponent: () =>
          import('../feature/products/product-catalog/product-catalog.component').then(
            (m) => m.ProductCatalogComponent,
          ),
      },
      {
        path: 'products/cart',
        loadComponent: () =>
          import('../feature/products/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('../feature/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
        resolve: {
          productDetail: productResolver,
        },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../feature/user-page-container/user-page/user-page.component').then(
            (m) => m.UserPageComponent,
          ),
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
