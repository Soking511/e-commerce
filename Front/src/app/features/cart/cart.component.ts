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
  selectedState: any[] = [];
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

  onStateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const stateCode = target.value;

    if (stateCode) {
      const selectedState = this.state.find(state => state.code === stateCode);
      this.selectedState = selectedState ? selectedState.cityDataModels : [];
    }
  }

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
      error: (err) => { this._NotificationService.showNotification('No More Stock', 'error'); }
    })
  }

  reductionProductQuantity(item: any){
    this._ApiService.update<CartItems[]>('carts', {quantity: item.quantity-1}, item._id).subscribe({
      next: (res) => {
        this.updateUserCart();
      },
      error: (err) => { this._NotificationService.showNotification('No More Stock', 'error');}
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
    this._ApiService.get('address', undefined, 'user').subscribe({
      next: (res) => {
        if (Array.isArray(res.data)) {
          this.currentUserAddress = res.data;
        } else {
          this.currentUserAddress = [];
        }
      },
      error: (err) => {
        this.currentUserAddress = [];
      }
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
    this._ApiService.fetch<any[]>('https://atfawry.fawrystaging.com/ECommerceWeb/api/lookups/govs').subscribe({
      next: (res) => {
        if (res) {
          this.state = res as any;
        }
      },
      error: (err) => {  }
    });
  }

  ngOnInit(): void {


    this._sideCartService.fetchCart();

    this._sideCartService.cartItems$.subscribe((items: CartItems[]) => {
      this.currentUserCart = items || [];
      this.totalPriceCart=0;
      for (let i = 0; i < this.currentUserCart.length; i++) {
        const item = this.currentUserCart[i];
        this.totalPriceCart += (item.price || 0) * (item.quantity || 0);
      }
    });

    this.getUserAddress();
    this.fetchCities();
    this.imgDomain = this._GlobalService.productsImage;
    // this._Router.events.subscribe(() => {
    //   this.currentRoute = this._Router.url;
    //   this.sideCart = false;
    // });
  }

}
