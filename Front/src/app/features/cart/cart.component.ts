import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../core/components/notification/services/notification.service';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { GlobalService } from '../../core/services/global.service';
import { Products } from '../../shared/interfaces/products';
import { CartService } from '../../shared/services/cart.service';
import { HomeComponent } from '../home/home.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HomeComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  guiPopWindows = { confirmBoolean: false, confirmedOrder: false, editorBoolean: false };
  totalPriceCart: number = 0;
  currentUserCart: any = {};
  currentUserAddress: any = {};
  selectedAddress:any = {};
  selectedState: any[] = [];
  imgDomain = ''
  state: any[] = [];
  loading: boolean = false;
  addressForm: FormGroup = new FormGroup({
    'street': new FormControl(null, [Validators.required]),
    'postalCode': new FormControl(null, [Validators.required]),
    'city': new FormControl(null, [Validators.required]),
    'state': new FormControl(null, [Validators.required])
  });

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _MessageService: MessageService,
    private _ApiService: ApiService,
    private _GlobalService:GlobalService,
    private cdr:ChangeDetectorRef,
    private _Router:Router
  ){ }

  // toggleSideCart() { this._sideCartService.toggleSideCart() }

  onStateChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const stateCode = target.value;

    if (stateCode) {
      const selectedState = this.state.find(state => state.code === stateCode);
      this.selectedState = selectedState ? selectedState.cityDataModels : [];
    }
  }

  addOrder() {
    if ( Object.keys(this.selectedAddress).length === 0 )
      return this.addMessage('error', 'enter any address', 'you can add new if u want');

    this._ApiService.post(`orders`, {address:this.selectedAddress}).subscribe({
      next: (res) => {
        this._Router.navigate(['/order-details'])
      },
      error: (err) => { }
    })
  }

  removeProductFromCart = (productId: string): void => this._CartService.removeFromCart(productId);
  updateProductQuantity = (product: Products, quantity: number) => this._CartService.updateQuantity(product._id!, quantity);

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

  fetchCities(): void {
    if (this.state.length === 0 && !this.loading) {
      this.loading = true;
      this._ApiService.fetch<any[]>('https://atfawry.fawrystaging.com/ECommerceWeb/api/lookups/govs').subscribe({
        next: (res) => {
          if (res) {
            this.state = res as any;
          }
          this.loading = false;
        },
        error: (err) => { }
      });
    }
  }

  addMessage( severity:string='success', summary:string='Service Message', detail:string='MessageService' ) {
    this._MessageService.add({severity, summary, detail});
  }

  getUserCart() {
    this._CartService.cart$.subscribe((cart) => {
      this.currentUserCart = cart;
      if ( cart.length < 1 ){
        this._Router.navigate(['home']);
        this.addMessage('error', 'you cart is empty', 'Added to wishlist');
      }
      this.totalPriceCart=0;
      for ( const item of cart ){
        this.totalPriceCart+=item.price!*item.quantity!;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.getUserCart();
    this.getUserAddress();
    this.fetchCities();
    this.imgDomain = this._GlobalService.productsImage;
  }

}
