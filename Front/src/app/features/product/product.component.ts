import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Products } from '../../shared/interfaces/products';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsService } from './reviews/services/reviews.service';
import { ProductsService } from './services/products.service';
import { ApiService } from '../../core/services/api.service';
import { NotificationService } from '../../core/components/notification/services/notification.service';
import { SideCartService } from '../../shared/services/side-cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReviewsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  product: Products = {};
  imgDomain: string = '';
  id: string = '';
  reviewError: string = '';
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor( private cdr: ChangeDetectorRef, private _ProductsService: ProductsService, private _ApiService:ApiService, private _ReviewsService: ReviewsService, private _ActivatedRoute: ActivatedRoute, private _NotificationService:NotificationService, private _sideCartService:SideCartService) { }

  loadProduct(productId: string) {
    this._ApiService.get<Products>(`products/${productId}`).subscribe({
      next: (res) => { this.product = res.data;},
      error: (err) => { },
    })
  }

  addProductToCart(product: any) {
    this._ApiService.post<any>('carts', { product: product._id }).subscribe({
      next: (res) => {
        this.getUserCart();
      },
      error: (err) => { }
    });
  }

  getUserCart() {
    this._ApiService.get<any>('carts', undefined, 'user').subscribe({
      next: (res) => {
        this._sideCartService.setCartItems(res.data.items);
        this.cdr.detectChanges();
      },
      error: (err) => { }
    });
  }


  ngOnInit(): void {
    this.getUserCart();
    this._sideCartService.cartItems$.subscribe(items => {
      this.cdr.detectChanges();
    });
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.imgDomain = this._ProductsService.productImages;
    this.loadProduct(this.id);
  }
}
