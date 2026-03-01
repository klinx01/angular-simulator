import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UserPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
