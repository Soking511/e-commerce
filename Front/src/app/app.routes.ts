import { Routes } from '@angular/router';
import { N404Component } from './n404/n404.component';

export const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", title:"home", loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  {path:"products/:id", title:"product", loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)},
  {path:"login", title:"Login", loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
  {path:"register", title:"Create Account", loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)},
  {path:"cart", title:"My Cart", loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)},
  {path:"**", title:"Not Found!", component:N404Component},
];
