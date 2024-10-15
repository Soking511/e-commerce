import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideCartService } from '../../../shared/services/side-cart.service';
import { GlobalService } from '../../../core/services/global.service';
import { CartItems } from '../../../shared/interfaces/order';
import { Products } from '../../../shared/interfaces/products';
// import { Products, CartItems } from '@angular/'

@Component({
  selector: 'app-side-cart',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.scss'
})
export class SideCartComponent implements OnInit{
  productDomain:string =''
  currentUserCart: CartItems[] = [];
  totalPriceCart: number = 0;
  sideCart = true;

  constructor( private _sideCartService:SideCartService, private _GlobalService:GlobalService ){ }

  removeProductFromCart(item:Products):void{

  }

  ngOnInit(): void {

    this.productDomain = this._GlobalService.productsImage;

    this._sideCartService.fetchCart();

    this._sideCartService.cartItems$.subscribe((items: CartItems[]) => {
      // this.currentUserCart = items || [];
      this.totalPriceCart=0;
      for (let i = 0; i < this.currentUserCart.length; i++) {
        const item = this.currentUserCart[i];
        // this.totalPriceCart += (item.price || 0) * (item.quantity || 0);
      }
    });

  }
}
