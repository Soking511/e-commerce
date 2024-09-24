import { CommonModule, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reviews } from '../interfaces/reviews';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgClass],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})

export class ReviewsComponent implements OnInit, OnDestroy {
  @ViewChild(ProductComponent) productComponent!: ProductComponent;
  subscription: any;
  product: Products = {};
  reviews: Reviews[] = [];
  currentUser = new BehaviorSubject(null);
  id: string = '';
  currentReviewID: string = '';
  editorBoolean: boolean = false;
  confirmBoolean: boolean = false;
  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
  });
  editForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    rate: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
  });
  productImage: string = '';

  constructor(
    private _AuthService: AuthService,
    private _ReviewsService: ReviewsService,
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _NotificationService: NotificationService,
    private _ProductComponent: ProductComponent,
    private _Router: Router
  ) { }

  getProduct(productId: string) {
    this.subscription = this._ProductsService.getProductByID(productId).subscribe({
      next: (res) => { this.product = res.data;
        this.loadProductReviews(productId);
      },
      error: (err) => { },
    });
  }

  loadProductReviews(productId: string) {
    this.subscription = this._ProductsService.getProductReview(productId).subscribe({

      next: (res) => { this.reviews = res.data; },
      error: (err) => { },
    });
  }

  deleteReview() {
    this._ReviewsService.removeReview(this.currentReviewID).subscribe({
      next: (res) => {
        this.showEditor(false);
        this.showDelete(false);
        location.reload();
      },
      error: (err) => {
        this._NotificationService.showNotification('Failed to delete review', 'error');
      }
    });
  }

  addReview(productID:string, reviewForm: any) {
    this._ReviewsService.addReview(productID, reviewForm.value).subscribe({
      next: (res) => {
        location.reload();
        this._NotificationService.showNotification('Review Added successfully!', 'success');
      },
      error: (err) => {
        if (err.error.errors) {
          this._NotificationService.showNotification(err.error.errors[0].msg, 'error')
        } else {
          this._NotificationService.showNotification('Login please !', 'error')
        }
      }
    })
  }

  updateReview(formData: any) {
    this._ReviewsService.updateReview(this.currentReviewID, formData.value).subscribe({
      next: (res) => {
        this.showEditor(false);
        this.showDelete(false);
        this._NotificationService.showNotification('Review Updated successfully!', 'success');
        this.loadProductReviews(this.id);
      },
      error: (err) => {
        if (err.error.errors) {
          this._NotificationService.showNotification(err.error.errors[0].msg, 'error')
        } else {
          this._NotificationService.showNotification('Login please !', 'error')
        }
      }
    })
  }

  setCurrentReviewID( reviewID: string) {
    this.currentReviewID = reviewID;
  }

  showEditor(bool:boolean){
    this.editorBoolean = bool;
  }

  showDelete(bool:boolean){
    this.confirmBoolean = bool;
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this._AuthService.checkToken();
    this.productImage = this._ReviewsService.productImage;
    this.currentUser = this._AuthService.currentUser;
    this.getProduct(this.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
