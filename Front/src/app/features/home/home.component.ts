import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, Pipe, PipeTransform, ViewChild } from '@angular/core';
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
import { GlobalService } from '../../core/services/global.service';
import { DescriptionPipe  } from '../../shared/pipes/description.pipe';
import { TreeModule } from 'primeng/tree';
import { MessageService, TreeNode } from 'primeng/api';
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AnimateOnScrollModule,
    ImageModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PanelModule, BadgeModule, ToastModule, ButtonModule, TabViewModule, TreeModule, FormsModule, FooterComponent, BestSellerComponent, ProductComponent, RouterLink, NotificationComponent, CommonModule, ReactiveFormsModule, CartComponent, DescriptionPipe],
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
  files: TreeNode[] = [];
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
  categoryImage=''
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor( private _MessageService:MessageService, private _ProductsService: ProductsService, private _GlobalService:GlobalService, private _ApiService: ApiService, private _SideCartService: SideCartService, private cdr: ChangeDetectorRef ) {
    this.files = [
      {
        label: 'Shop by Category',
        expanded: true,
        children: []
      },
    ];
  }


  loadCategories() {
    this._ApiService.get<Categories[]>('categories', 50).subscribe({
      next: (res) => {
        this.categories = res.data
        for (let category of this.categories) {
          this.files[0].children?.push({
            label: category.name,
            expanded: false,
          });
        }
      },
      error: (err) => { }
    })
  }


  getUserCart() {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this._SideCartService.setCartItems(res.data.items);
        this.updateUserCart();
        this.cdr.detectChanges();
      },
      error: (err) => {}
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

  loadSubCategories(category?:string) {
    this._ApiService.get<Subcategories[]>('subcategory', 50, undefined, `${this.categoryForm.get('_id')?.value! !== 'All'? '&category='+category:''}`).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
  }

  addMessage( severity:string='success', summary:string='Service Message', detail:string='MessageService' ) {
    this._MessageService.add({severity, summary, detail});
  }

  addProductToCart(product: any) {
    this._ApiService.post<any>('carts', { product: product._id }).subscribe({
      next: (res) => {
        this.getUserCart();
        this.addMessage(undefined, 'Success', 'Product Added: ' + product.name);
      },
      error: (err) => { }
    });
  }

  addProductToWishlist(product: any) {
    this._ApiService.post<any>(`wishlist`, { product: product._id }).subscribe({
      next: (res) => {
        this.addMessage('success', 'success', 'Added to wishlist');
      },
      error: (err) => { }
    });
  }

  updateProductQuantity(at: any, num:number){
    for (let item of this.currentCart['cart'].items) {
      if (at._id=== item.product._id) {
        if ( item.quantity+num >= 1 ){
          this._ApiService.update<any>(`carts`, { quantity: item.quantity+num }, item._id).subscribe({
            next: (res) => {
              this.getUserCart();
            },
            error: (err) => {
              this.addMessage('error', 'error', 'No More Stock');
            }
          });
        } else
        this.addMessage('error', 'error', 'enter valid number');

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
        this.addMessage('info', 'Success', 'Product Removed');
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

    this.categoryImage = this._GlobalService.categoryImage;
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
