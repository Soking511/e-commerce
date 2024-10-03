import { ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { NotificationComponent } from '../../core/components/notification/notification.component';
import { NotificationService } from '../../core/components/notification/services/notification.service';
import { Categories } from '../../shared/interfaces/categories';
import { Pagination } from '../../shared/interfaces/pagination';
import { Products } from '../../shared/interfaces/products';
import { ProductsService } from '../product/services/products.service';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ApiService } from '../../core/services/api.service';
import { Subcategories } from '../../shared/interfaces/subcategories';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SideCartService } from '../../shared/services/side-cart.service';

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
    ]), 
  ]
})

export class HomeComponent implements OnDestroy {
  isLoading = false;
  currentUserCart: any[] = [];
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

  constructor(
    private _ProductsService: ProductsService,
    private _ApiService: ApiService,
    private _SideCartService: SideCartService,
    private _NotificationService: NotificationService,
    private cdr: ChangeDetectorRef
) { }


  getUserCart() {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this._SideCartService.setCartItems(res.data.items);
        this.updateUserCart();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching cart', err);
      }
    });
  }

  getProductItem(productId: string) {
    const cartItems = this.currentCart?.cart?.items || [];
    const productItem = cartItems.find((item: any) => item.product._id === productId);
    if (productItem) return productItem;
  }

  loadProducts() {
    this.isLoading = true;
    this._ApiService.get<Products[]>( 'products', this.limit, undefined, `&page=${this.page}&sort=${this.sort}&search=${this.search}${( this.categoryForm.get('_id')?.value! !== 'All')? ('&category='+this.categoryForm.get('_id')?.value!):''}${( this.subcategoryForm.get('_id')?.value! !== 'All')? ('&subcategory='+this.subcategoryForm.get('_id')?.value!):'' }`).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => { this.isLoading = false; }
    })
  }

  loadCategories() {
    this._ApiService.get<Categories[]>('categories', 50).subscribe({
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
    this._ApiService.post<any>('carts', { product: product._id }).subscribe({
      next: (res) => {
        this.getUserCart();
      },
      error: (err) => {
        console.error('Error adding product to cart', err);
      }
    });
  }

  addProductToWishlist(product: any) {
    this._ApiService.post<any>(`wishlist`, { product: product._id }).subscribe({
      next: (res) => {
        this._NotificationService.showNotification('Added to wishlist', 'success');
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    });
  }

  updateProductQuantity(at: any, num:number){
    for (let item of this.currentCart['cart'].items) {
      if (at._id=== item.product._id) {
        if ( item.quantity+num >= 1 ){
          let productInCart = item.product;
          this._ApiService.update<any>(`carts`, { quantity: item.quantity+num }, item._id).subscribe({
            next: (res) => {
              this.getUserCart();
            },
            error: (err) => {
              this._NotificationService.showNotification(err.message, 'error');
            }
          });
        } else this._NotificationService.showNotification('enter valid quantity', 'error');

      }
    }
  }

  updateUserCart() {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this.currentCart['cart'] = res.data;
        for (let i = 0; i < res.data.items.length; i++) {
          this.userCart[res.data.items[i].product._id] = {
            quantity: res.data.items[i].product.quantity || 1,
            name: res.data.items[i].product.name
          };
        }
        this.cdr.detectChanges();
      },
      error: (err) => { }
    });
  }

  removeProductFromCart(item: any) {
    this._ApiService.delete('carts', item).subscribe({
      next: (res) => {
        this.getUserCart();
        this.cdr.detectChanges();
      },
      error: (err) => { }
    });
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight * 0.7 && !this.isLoading && this.page < this.pagination.totalPages!) {
      this.limit+=4;
      this.loadProducts();
    }
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadProducts();
  }

  ngOnInit(): void {
    this.getUserCart();
    this._SideCartService.cartItems$.subscribe(items => {
      if (items) {
        this.currentUserCart = items;
        this.updateUserCart();
      } else {
        this.currentUserCart = [];
      }
      this.cdr.detectChanges();
    });
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
  }

  ngOnDestroy(): void {
  }
}
