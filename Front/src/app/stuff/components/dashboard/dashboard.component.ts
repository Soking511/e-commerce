import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  Operations = [
    {
      name: 'Users',
      route: '',
      showSections: false,

      childs: [
        { name: 'Address', route: '' },
        { name: 'Orders', route: '' }
      ]
    },
    {
      name: 'Products',
      route: '',
      showSections: false,
      childs: [
        { name: 'Reviews', route: '' }
      ]
    },

    { name: 'Categories', route: '' },
    { name: 'Subcategories', route: '' },
    { name: 'Coupons', route: '' },
    { name: 'Orders', route: '' },
  ];

  constructor() { }

  showDashboardSections( Operation:any, bool: boolean ){
    Operation.showSections = bool;
  }
}
