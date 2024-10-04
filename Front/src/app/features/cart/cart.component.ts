import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/components/notification/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { GlobalService } from '../../core/services/global.service';
import { ApiService } from '../../core/services/api.service';
import { HomeComponent } from '../home/home.component';
import { CartItems } from '../../shared/interfaces/order';
import { SideCartService } from '../../shared/services/side-cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HomeComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  guiPopWindows = { confirmBoolean: false, confirmedOrder: false, editorBoolean: false };
  userCart: any = {};
  totalPriceCart: number = 0;
  currentUserCart: any = {};
  currentUserAddress: any = {};
  selectedAddress:any = {};
  pagination: any;
  currentRoute: string = '';
  sideCart: boolean = false;
  imgDomain = ''
  state: any[] = [];
  addressForm: FormGroup = new FormGroup({
    'street': new FormControl(null, [Validators.required]),
    'postalCode': new FormControl(null, [Validators.required]),
    'city': new FormControl(null, [Validators.required]),
    'state': new FormControl(null, [Validators.required])
  });

  constructor( private _AuthService: AuthService, private _NotificationService: NotificationService, private _ApiService: ApiService, private _sideCartService: SideCartService, private _GlobalService:GlobalService, private _Router:Router ){ }

  toggleSideCart() { this._sideCartService.toggleSideCart() }

  removeProductFromCart(item: any) {
    this._ApiService.delete('carts', item._id).subscribe({
      next: (res) => {
        this.updateUserCart();
      },
      error: (err) => { }
    })
  }

  addOrder() {
    if ( Object.keys(this.selectedAddress).length === 0 )
      return this._NotificationService.showNotification('Select Address !!', 'error')

    this._ApiService.post(`orders`, {address:this.selectedAddress}).subscribe({
      next: (res) => {
        this._Router.navigate(['/order-details'])
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    })
  }

  addProductQuantity(item: any){
    this._ApiService.update<CartItems[]>('carts', {quantity: item.quantity+1}, item._id).subscribe({
      next: (res) => {
        this.updateUserCart();
      },
      error: (err) => { }
    })
  }

  reductionProductQuantity(item: any){
    this._ApiService.update<CartItems[]>('carts', {quantity: item.quantity-1}, item._id).subscribe({
      next: (res) => {
        this.updateUserCart();
      },
      error: (err) => { }
    })
  }

  updateUserCart() {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this._sideCartService.setCartItems(res.data.items);
      },
      error: (err) => { }
    });
  }

  getUserAddress() {
    this._AuthService.getUserAddress().subscribe({
      next: (res) => {
        this.currentUserAddress = res.data;;
      },
      error: (err) => { }
    });
  }

  deleteAddress(addressID: string){
    this._AuthService.deleteUserAddress(addressID).subscribe({
      next:(res)=>{
        this.getUserAddress();
        this.selectedAddress = {}
      },
      error:(err)=>{ }
    })
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

  ngOnInit(): void {
    this._sideCartService.sideCart$.subscribe(state => {
      this.sideCart = state;
    });
    this._sideCartService.cartItems$.subscribe(items => {
      this.currentUserCart = items || [];
      this.totalPriceCart = 0;
      for ( let i = 0; i < items.length; i++ ){
        this.totalPriceCart += ( items[i].price * items[i].quantity);
      }

    });

    this.getUserAddress();
    this.fetchCities();
    this.imgDomain = this._GlobalService.productsImage;
    this._Router.events.subscribe(() => {
      this.currentRoute = this._Router.url;
      this.sideCart = false;
    });
  }
}
