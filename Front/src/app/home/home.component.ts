import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from '../Main Components/footer/footer.component';
import { BestSellerComponent } from "./best-seller/best-seller.component";
import { NotificationComponent } from '../Main Components/notification/notification.component';
import { Products } from '../Main Components/interfaces/products';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/admin/category.service';
import { Categories } from '../Main Components/interfaces/categories';
import { SubcategoryService } from '../services/subcategory.service';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pagination } from '../Main Components/interfaces/pagination';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, BestSellerComponent, ProductComponent, RouterLink, NotificationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild(CartComponent) _CartComponent!: CartComponent;
  subscription: any;
  products: Products[] = [];
  categories: Categories[] = [];
  subcategories: Categories[] = [];
  categoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required])});
  subcategoryForm = new FormGroup({ _id: new FormControl("All", [Validators.required]) });
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 16;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _CategoryService: CategoryService,
    private _SubcategoryService: SubcategoryService,
    private _CartService: CartService,
    private _AuthService: AuthService,
    private _NotificationService: NotificationService,
    private _ActivatedRoute: ActivatedRoute
) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, '-quantity', this.search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  loadSearch() {
    this.subscription = this._ProductsService.getAllProducts(16, 1, '-quantity', this.search,
      ( this.categoryForm.get('_id')?.value! !== 'All')? this.categoryForm.get('_id')?.value!:null!,
      ( this.subcategoryForm.get('_id')?.value! !== 'All')? this.subcategoryForm.get('_id')?.value!:null! )
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
        },
        error: (err) => { }
      })
    }

  loadCategories() {
    this.subscription = this._CategoryService.getAllCategories().subscribe({
      next: (res) => { this.categories = res.data },
      error: (err) => { }
    })
  }

  addProductToCart(product:any){
    this._CartService.addProductToCart(product._id, this._AuthService.currentUser.value).subscribe({
      next: (res) => {
        this._NotificationService.showNotification('Added To Cart', 'success');
      },
      error: (err) => {
        this._NotificationService.showNotification(err.message, 'error');
      }
    });
  }

  loadSubCategories(category?:string) {
    this.subscription = this._SubcategoryService.getAllSubcategories(( category !== 'All')? category:null!).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
    this.loadSearch();
  }


  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadSearch();
  }

  ngOnInit(): void {
    this.imgDomain = this._ProductsService.productImages;
    this.loadProducts();
    this.loadCategories();
    this.loadSubCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
