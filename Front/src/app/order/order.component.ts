import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})


export class OrderComponent {
  subscription:any;
  currentOrder: any[] = [];
  orders: any[] = [];

  constructor(
    private _OrderService: OrderService,
    private _NotificationService: NotificationService,
  ) { }

  getAllOrders(){
    this.subscription = this._OrderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
      },
      error: (err) => { }
    })
  }

  // addOrder() {
  //   this._OrderService.addOrder().subscribe({
  //     next: (res) => {
  //       this._NotificationService.showNotification('Category Added', 'success');
  //     },
  //     error: (err) => {
  //       this._NotificationService.showNotification(err.message, 'error');
  //     }
  //   })
  // }

  removeOrder(OrderID:string) {
    this._OrderService.removeOrder(OrderID).subscribe({
      next: (res) => {
        this._NotificationService.showNotification('Category Removed', 'success');
      },
      error: (err) => { }
    })
  }

  getOrder(OrderID:string) {
    this.subscription = this._OrderService.getOrder(OrderID).subscribe({
      next: (res) => {
        this.currentOrder = res.data
      },
      error: (err) => { }
    })
  }

}
