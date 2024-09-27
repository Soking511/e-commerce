import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

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
        next: (res) => { this.tempCart = res.data },
        error: (error) => { }
      })
  }

}
