import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SideCartService {
  constructor( private _ApiService:ApiService ){}
  private sideCartSubject = new BehaviorSubject<boolean>(false);
  sideCart$ = this.sideCartSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  toggleSideCart() {
    const currentState = this.sideCartSubject.getValue();
    this.sideCartSubject.next(!currentState);
  }

  setSideCart(state: boolean) {
    this.sideCartSubject.next(state);
  }

  setCartItems(items: any[]) {
    this.cartItemsSubject.next(items);
  }

  addToCart(item: any) {
    const currentCart = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentCart, item]);
  }
  
  removeFromCart(itemId: string) {
    const currentCart = this.cartItemsSubject.getValue();
    const updatedCart = currentCart.filter(item => item.product._id !== itemId);
    this.cartItemsSubject.next(updatedCart);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

}
