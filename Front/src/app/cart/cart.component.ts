import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { GlobalService } from '../services/global.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy{
  currentUserCart: any = {};
  currentUserAddress: any = {};
  selectedAddress:any = {};
  pagination: any;
  subscription:any;
  guiPopWindows = {
    confirmBoolean: false,
    confirmedOrder: false,
    editorBoolean: false
  };

  state: any[] = [];
  addressForm: FormGroup = new FormGroup({
    'street': new FormControl(null, [Validators.required]),
    'postalCode': new FormControl(null, [Validators.required]),
    'city': new FormControl(null, [Validators.required]),
    'state': new FormControl(null, [Validators.required])
  });

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _NotificationService: NotificationService,
    private _OrderService: OrderService,
    private _GlobalService:GlobalService,
    private _Router:Router
  ){ }

  removeProductFromCart(item: any) {
    this._CartService.removeProductFromCart(item).subscribe({
      next: (res) => {
        this.getUserCart();
      },
      error: (err) => { }
    })
  }

  addOrder() {
    this._OrderService.addOrder(this.selectedAddress).subscribe({
      next: (res) => {
        // location.reload();
        this._Router.navigate(['/order-details'])
        // this._OrderService.getOrderPlaced(this.currentUserCart);
        // this.guiPopWindows.confirmedOrder = true;
        // console.log(this.currentUserCart);
        // this._Router.navigate(['/orderPlaced'])
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    })
  }

  addProductQuantity(item: any){
    this._CartService.updateProductQuantity(item, 1).subscribe({
      next: (res) => {
        this.getUserCart();
      },
      error: (err) => {
        this._NotificationService.showNotification(err.error.errors[0].msg, 'error')

      }
    })
  }

  reductionProductQuantity(item: any){
    this._CartService.updateProductQuantity(item, -1).subscribe({
      next: (res) => {
        this.getUserCart();
      },
      error: (err) => {
        this._NotificationService.showNotification(err.error.errors[0].msg, 'error')
      }
    })
  }

  setCurrentAddress(address: any){ this.selectedAddress = ( address._id == this.selectedAddress._id )? '':address }

  deleteAddress(addressID: string){
    this._AuthService.deleteUserAddress(addressID).subscribe({
      next:(res)=>{
        this.getUserAddress();
        this.selectedAddress = {}
      },
      error:(err)=>{ }
    })
  }

  getUserCart() {
    this.subscription = this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.currentUserCart['cart'] = res.data;
      },
      error: (err) => { }
    });
  }


  getUserAddress() {
    this.subscription = this._AuthService.getUserAddress().subscribe({
      next: (res) => {
        this.currentUserAddress = res.data;;
      },
      error: (err) => { }
    });
  }

  addUserAddress(formData:any){
    this._AuthService.addUserAddress({'address':[formData.value]}).subscribe({
      next: (res) => {
        location.reload();
      },
      error: (err) => { }
    });
  }

  fetchCities() {
    this._GlobalService.fetchCities().subscribe(
      (data) => { this.state = data },
      (error) => { }
    );
  }

  showEditor(bool:boolean){ this.guiPopWindows.editorBoolean = bool }
  showDelete(bool:boolean){ this.guiPopWindows.confirmBoolean = bool }

  ngOnInit(): void {
      this.getUserCart();
      this.getUserAddress();
      this.fetchCities();
    }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
