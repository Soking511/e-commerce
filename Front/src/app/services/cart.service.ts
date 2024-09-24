import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import Cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private baseUrl: string = '';
  private cartRoute: string = '';
  private apiKey: string = '';

  constructor(private _GlobalService: GlobalService, private _HttpClient:HttpClient) {
    this.baseUrl = this._GlobalService.baseURL;
    this.cartRoute = this._GlobalService.cartRoute;
    this.apiKey = this._GlobalService.apiKey;
  }
// items[product, quantity, price] | totalPrice | totalPriceAfterDiscount | user

  addProductToCart(data:any): Observable<any> {
  return this._HttpClient.post(`${this.baseUrl}${this.cartRoute}`, data
    , {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
      }, withCredentials: true
    })
  }

  getUserCart(user:any): Observable<any> {
  return this._HttpClient.get(`${this.baseUrl}${this.cartRoute}`
    , {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
      }, withCredentials: true
    })
  }


}
