import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  formData: FormData = new FormData();
  user: any;
  products: any[] = [];
  pagination: any;

  constructor(private _AuthService: AuthService, private _CartService: CartService) {
    this.user = this._AuthService.currentUser?.value;
  }

  addProductToCart(item: any) {
    this.formData.append('user', this.user);
    this.formData.append('product', item);
    this._CartService.addProductToCart(this.formData);
  }

  removeProductFromCart(item: any) {
    // Implementation for removing product
  }

  getUserCart() {
    this._CartService.getUserCart(this.user).subscribe({
      next: (res) => {
        // this.formData.set('product', res.data.product)
        console.log(res.data);
      },
      error: (err) => {
        console.error('Error fetching user cart:', err);
      }
    });
  }
}
