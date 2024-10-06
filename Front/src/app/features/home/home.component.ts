import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { NotificationComponent } from '../../core/components/notification/notification.component';
import { NotificationService } from '../../core/components/notification/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { Categories } from '../../shared/interfaces/categories';
import { Pagination } from '../../shared/interfaces/pagination';
import { Products } from '../../shared/interfaces/products';
import { CartService } from '../cart/services/cart.service';
import { ProductsService } from '../product/services/products.service';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ApiService } from '../../core/services/api.service';
import { Subcategories } from '../../shared/interfaces/subcategories';
import { CartItems, Order } from '../../shared/interfaces/order';
import { Reviews } from '../../shared/interfaces/reviews';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',

  standalone: true,
  imports: [FormsModule, FooterComponent, BestSellerComponent, ProductComponent, RouterLink, NotificationComponent, CommonModule, ReactiveFormsModule, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',  animations: [
    trigger('cardAnimation', [
      state('normal', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('scaled', style({
        transform: 'scale(1.05)',
        opacity: 0.7
      })),
      transition('normal <=> scaled', [
        animate('0.2s ease-in-out')
      ])
    ])
  ]

})

export class HomeComponent {
  // @ViewChild(CartComponent) _CartComponent!: CartComponent;
  @Input() currentUserCart: any = {};
  @Input() currentUserAddress: any = {};
  @Input() selectedAddress: any = {};
  // @Input() sideCart=false;
  sideCart: boolean=false;
  subscription: any;
  products: Products[] = [];
  categories: Categories[] = [];
  subcategories: Subcategories[] = [];
  userCart: any = {};
  categoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required])});
  subcategoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required]) });
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 8;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';
  currentCart: any = {};
  addedToCart = false;

  constructor(
    private _ProductsService: ProductsService,
    private _ApiService: ApiService,
    private _NotificationService: NotificationService,
    private _CartService: CartService,
) { }

  updateUserCart( ){
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this.currentCart['cart'] = res.data;
        for (let i = 0; i < res.data.items.length; i++) {
          this.userCart[res.data.items[i].product._id] = {
            quantity: res.data.items[i].product.quantity || 1,
            name: res.data.items[i].product.name
          };
        }
      },
      error: (err) => { }
    })
  }

  getProductItem(productId: string) {
    const cartItems = this.currentCart?.cart?.items || [];
    const productItem = cartItems.find((item: any) => item.product._id === productId);
    if (productItem) return productItem;
  }

  loadProducts() {
    this._ApiService.get<Products[]>('products', this.limit, undefined, `&page=${this.page}&sort=${this.sort}&search=${this.search}${( this.categoryForm.get('_id')?.value! !== 'All')? ('&category='+this.categoryForm.get('_id')?.value!):''}${( this.subcategoryForm.get('_id')?.value! !== 'All')? ('&subcategory='+this.subcategoryForm.get('_id')?.value!):'' }`).subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  loadCategories() {
    this._ApiService.get<Categories[]>('categories', 50 ).subscribe({
      next: (res) => { this.categories = res.data },
      error: (err) => { }
    })
  }

  loadSubCategories(category?:string) {
    this._ApiService.get<Subcategories[]>('subcategory', 50, undefined, `${this.categoryForm.get('_id')?.value! !== 'All'? '&category='+category:''}`).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
  }


  addProductToCart(product: any) {
    this._ApiService.post<Products[]>('carts', { product }).subscribe({
      next: (res) => {
        this.updateUserCart();
        this.addedToCart = true;

        setTimeout(() => {
          this.addedToCart = false;
        }, 500);
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    });
  }

  addProductToWishlist(product: any) {
    this._ApiService.post<any>(`wishlist`, { product: product._id }).subscribe({
      next: (res) => {
        this.updateUserCart();
        this._NotificationService.showNotification('Added to wishlist', 'success');
      },
      // error: (err) => {
      //   this._NotificationService.showNotification(err.message, 'error');
      // }
    });
  }

  updateProductQuantity(at: any, num:number){
    for (let item of this.currentCart['cart'].items) {
      if (at._id=== item.product._id) {
        if ( item.quantity+num >= 1 ){
          let productInCart = item.product;
          this._ApiService.update<any>(`carts`, { quantity: item.quantity+num }, item._id).subscribe({
            next: (res) => {
              this.updateUserCart();
              console.log('done');
            },
            error: (err) => {
              this._NotificationService.showNotification(err.message, 'error');
            }
          });
        } else this._NotificationService.showNotification('enter valid quantity', 'error');

      }
    }
  }

  removeProductFromCart(item: any) {
    this._ApiService.delete('carts', item).subscribe({
      next: (res) => {
        location.reload();
      },
      // error:(err) => { }
    })
  }


  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadProducts();
  }

  showSideCart(bool:boolean){
    this.sideCart = true;
  }

  ngOnInit(): void {

    this.updateUserCart();

    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
  }

}
