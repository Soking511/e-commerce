import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Login, ResetPassword, SendMail, Register, VerifyCode } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { Reviews } from '../interfaces/reviews';

@Injectable({
  providedIn: 'root'
})

export class ReviewsService {

  private baseUrl: string = '';
  private reviewsRoute: string = '';
  private productsRoute: string = '';
  apiKey: string = '';
  productImage: string = '';

  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _Router: Router) {
    this.baseUrl = this._GlobalService.baseURL;
    this.reviewsRoute = this._GlobalService.reviewsRoute;
    this.productsRoute = this._GlobalService.productsRoute;
    this.productImage = this._GlobalService.productsImage;
    this.apiKey = this._GlobalService.apiKey;

    if (localStorage.getItem('user') !== null) {
      // this.saveCurrentUser();
    }
  };

  addReview(productID: string, formData: Reviews): Observable<any> {

    return this._HttpClient.post(`${this.baseUrl}${this.productsRoute}/${productID}/reviews`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    });
  }


  updateReview(reviewID: string, formData: Reviews): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.reviewsRoute}/${reviewID}`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    });
  }


  removeReview(reviewID: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.reviewsRoute}/${reviewID}`, {
      headers:{
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials:true
    })
  }

  getReviews(limit: number = 50, page: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.reviewsRoute}/me?limit=${limit}&page=${page}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  getReview(productID: string, user: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}/${productID}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

}
