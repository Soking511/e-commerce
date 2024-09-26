import { Routes } from '@angular/router';
import { N404Component } from './Main Components/n404/n404.component';

export const routes: Routes = [
  // Home
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", title:"home", loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  // products
  {path:"products/:id", title:"product", loadComponent: () => import('./product/product.component').then(m => m.ProductComponent)},
  // User [login-register]
  {path:"login", title:"Login", loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
  {path:"register", title:"Create Account", loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)},
  // Cart
  {path:"cart", title:"My Cart", loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)},
  // Order View
  {path:"order", title:"Order View", loadComponent: () => import('./order/order.component').then(m => m.OrderComponent)},
  // Order Final View
  {path:"order-details", title:"Order View", loadComponent: () => import('./order-details/order-details.component').then(m => m.OrderDetailsComponent)},
  // Admin Section
  {path:"admin", title:"My Cart", loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)},
  {path:"admin/category", title:"Categories", loadComponent: () => import('./admin/category/category.component').then(m => m.CategoryComponent)},

  // Error: 404 !
  {path:"**", title:"Not Found!", component:N404Component},
];
