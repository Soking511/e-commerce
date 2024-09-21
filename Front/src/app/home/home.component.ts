import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { NotificationComponent } from '../notification/notification.component';
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Categories } from '../interfaces/categories';
import { SubcategoryService } from '../services/subcategory.service';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pagination } from '../interfaces/pagination';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, BestSellerComponent, ProductComponent, RouterLink, NotificationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  subscription: any;
  products: Products[] = [];
  categories: Categories[] = [];
  subcategories: Categories[] = [];
  categoryForm = new FormGroup({
    _id: new FormControl(null, [Validators.required]),
  });
  imgDomain: string = '';
  pagination: Pagination = {};
  limit: number = 16;
  page: number = 1;
  sort: string = '-createdAt'
  search: string = '';
  constructor(private _ProductsService: ProductsService, private _CategoryService: CategoryService, private _SubcategoryService: SubcategoryService, private _ActivatedRoute: ActivatedRoute) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAllProducts(this.limit, this.page, '-sold', this.search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  loadSearch() {
    const selectedCategory = this.categoryForm.get('_id')?.value||'All';
    // console.log(selectedCategory);
    this.subscription = this._ProductsService.getAllProducts(16, 1, '-sold', this.search,  ( selectedCategory !== 'All' )?  selectedCategory : '').subscribe({

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

  loadSubCategories() {
    this.subscription = this._SubcategoryService.getAllSubcategories().subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
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
