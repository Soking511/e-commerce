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
import { CartItems } from '../../shared/interfaces/order';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, FooterComponent, BestSellerComponent, ProductComponent, RouterLink, NotificationComponent, CommonModule, ReactiveFormsModule, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
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
  categoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required])});
  subcategoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required]) });
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 8;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _ApiService: ApiService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _NotificationService: NotificationService,
    private _ActivatedRoute: ActivatedRoute
) {

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
    this._ApiService.get<Categories[]>('categories').subscribe({
      next: (res) => { this.categories = res.data },
      error: (err) => { }
    })
  }

  loadSubCategories(category?:string) {
    this._ApiService.get<Subcategories[]>('subcategory', undefined, undefined, `${this.categoryForm.get('_id')?.value! !== 'All'? '&category='+category:''}`).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
  }

  addProductToCart(product:any){
    this._ApiService.post('carts', {product:product._id}).subscribe({
      next: (res) => {
        this._NotificationService.showNotification('Added To Cart', 'success');
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    });
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
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
  }

}
