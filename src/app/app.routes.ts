import { Routes } from '@angular/router';

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
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
];
