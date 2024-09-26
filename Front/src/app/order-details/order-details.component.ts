import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})

export class OrderDetailsComponent implements OnInit{
  tempCart: any = {}

  constructor( private _OrderService:OrderService ){ }

  ngOnInit(): void {
      this._OrderService.getLastOne().subscribe({
        next: (res) => { this.tempCart = res.data
          console.log(this.tempCart);
        },
        // error: (error) => { }
      })
  }

}
