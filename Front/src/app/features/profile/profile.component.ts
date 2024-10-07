import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { Users } from '../../shared/interfaces/uesrs';
import { RouterLink } from '@angular/router';
import { OrdersComponent } from "./orders/orders.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { MywishlistComponent } from './mywishlist/mywishlist.component';
import { UsersComponent } from '../../stuff/components/users/users.component';
import { CategoriesComponent } from "../../stuff/components/categories/categories.component";
import { SubcategoriesComponent } from "../../stuff/components/subcategories/subcategories.component";
import { CouponsComponent } from "../../stuff/components/coupons/coupons.component";
import { OrdersAdminComponent } from "../../stuff/components/orders-admin/orders-admin.component";
import { ProductsComponent } from "../../stuff/components/products/products.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, OrdersComponent, MyprofileComponent, MyreviewsComponent, MywishlistComponent, UsersComponent, CategoriesComponent, SubcategoriesComponent, CouponsComponent, OrdersAdminComponent, ProductsComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userImage: any;
  uploadImage: any;
  isAdmin = false;
  isSidebarOpen = true;
  OperationSelected=''
  Operations = [
    {
      name: 'My Profile',
      icon: 'account_circle', // Icon for My Profile
      showSections: false,
    },
    {
      name: 'My Orders',
      icon: 'shopping_cart', // Icon for My Orders
      showSections: false,
    },
    {
      name: 'Reviews',
      icon: 'rate_review', // Icon for Reviews
      showSections: false,
    },
    {
      name: 'My Wishlist',
      icon: 'favorite', // Icon for My Wishlist
      showSections: false,
    },
  ];

  AdminOperations = [
    { name: 'Manage Users', icon: 'group', showSections: false }, // Icon for Manage Users
    { name: 'Products', icon: 'inventory', showSections: false }, // Icon for Products
    { name: 'Categories', icon: 'category', showSections: false }, // Icon for Categories
    { name: 'Subcategories', icon: 'subdirectory_arrow_right', showSections: false }, // Icon for Subcategories
    { name: 'Coupons', icon: 'local_offer', showSections: false }, // Icon for Coupons
    { name: 'Orders', icon: 'list_alt', showSections: false }, // Icon for Orders
  ];

  constructor(private _AuthService: AuthService, private _ApiService: ApiService) { }

  getCurrentUserInfo() {
    this._ApiService.get<Users>('users/me', undefined, 'user').subscribe({
      next: (res) => {
        this.currentUser = res.data;
        if ( res.data.role == 'manager' ){
          this.isAdmin = true;
        }
      },
      error: (err) => { }
    });
  }

  sideBar(bool:boolean){
    this.isSidebarOpen = bool;
  }

  selected(Operation:any){
    this.OperationSelected=(this.OperationSelected == Operation)? null:Operation;
    this.Operations.forEach(op => {
      if (op.name !== this.OperationSelected) {
        op.showSections = false;
      } else {
        op.showSections = true;
      }
    });
  }


  ngOnInit(): void {
    this.getCurrentUserInfo();
    this.userImage = this._AuthService.usersImage;
  }
}
