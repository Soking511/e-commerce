import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { N404Component } from './n404/n404.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", title:"home", loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path:"login", title:"login", loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
  {path:"**", title:"Not Found!", component:N404Component},
];
