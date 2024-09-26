import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addProductToCart(item:any, user:any): Observable<any> {
  const form: any = { product: item };
  return this._HttpClient.post(`${this.baseUrl}${this.cartRoute}`, form
    , {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
      }, withCredentials: true
    })
  }

  updateProductQuantity(data:any, num:any): Observable<any> {
  const form: any = {
    quantity: data.quantity+num
  };

  return this._HttpClient.put(`${this.baseUrl}${this.cartRoute}/${data._id}`, form
    , {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
      }, withCredentials: true
    })
  }

  removeProductFromCart(product:any): Observable<any> {
  return this._HttpClient.delete(`${this.baseUrl}${this.cartRoute}/${product._id}`
    , {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
      }, withCredentials: true
    })
  }


  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.cartRoute}`
      , {
        headers: {
          authorization: `Bearer ${localStorage.getItem('user')}`,
          "X-API-KEY": `${this.apiKey}`,
        }, withCredentials: true
      })
    }




}
