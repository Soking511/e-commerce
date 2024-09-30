import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { ApiService } from '../../../core/services/api.service';
import { Users } from '../../../shared/interfaces/uesrs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, RouterOutlet, NgClass, UsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  OperationSelected=''
  Operations = [
    {
      name: 'Users',
      route: 'users',
      showSections: false,
      parts: [
        { name: 'Address', route: 'address' },
        { name: 'Orders', route: 'orders' }
      ]
    },

    {
      name: 'Products',
      route: '',
      showSections: false,
      parts: [
        { name: 'Reviews', route: 'reviews' }
      ]
    },

    { name: 'Categories', route: 'categories' },
    { name: 'Subcategories', route: 'subcategories' },
    { name: 'Coupons', route: 'coupons' },
    { name: 'Orders', route: 'orders' },
  ];

  constructor(private _ApiService:ApiService) { }


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
}
