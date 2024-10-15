import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItems } from '../interfaces/order';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItems[]>([]);
  cart$ = this.cart.asObservable();

  constructor(
    private _ApiService:ApiService
  ){ }

  getCart(): CartItems[] {
    return this.cart.getValue();
  }

  addToCart(item: CartItems) {
    const currentCart = this.cart.getValue();
    this.cart.next([...currentCart, item]);
  }

  updateQuantity(productId: string, quantity: number) {
    const currentCart = this.cart.getValue();
    const index = currentCart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      currentCart[index].quantity = quantity;
    }
    this.cart.next(currentCart);
  }

  removeFromCart(itemId: string) {
    const currentCart = this.cart.getValue();
    // Ensure the structure matches your data model
    const updatedCart = currentCart.filter((item) => item.product._id !== itemId);
    this.cart.next(updatedCart);
  }

  fetchCart(callback?: () => void) {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this.setCartItems(res.data.items);
        if (callback) {
          callback();
        }
      },
      error: (err) => {
        console.error(err); // Add proper error handling
      },
    });
  }

  clearCart() {
    this.cart.next([]);
  }
}
