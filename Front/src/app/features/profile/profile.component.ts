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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, OrdersComponent, MyprofileComponent, MyreviewsComponent, MywishlistComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userImage: any;
  uploadImage: any;
  OperationSelected=''
  Operations = [
    {
      name: 'My Profile',
      route: 'profile',
      showSections: false,
    },
    {
      name: 'Orders',
      route: 'Orders',
      showSections: false,
    },
    {
      name: 'Reviews',
      route: 'Reviews',
      showSections: false,
    },
    {
      name: 'My Wishlist',
      route: 'wishlist',
      showSections: false,
    },
  ];

  constructor(private _AuthService: AuthService, private _ApiService: ApiService) { }

  getCurrentUserInfo() {
    this._ApiService.get<Users>('users/me', undefined, 'user').subscribe({
      next: (res) => {
        this.currentUser = res.data;
      },
      error: (err) => { }
    });
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
  }
}
