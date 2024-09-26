import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class OrderService {
  private baseUrl: string = '';
  private apiKey: string = '';
  private orderRoute: string = '';

  constructor(
    private _GlobalService: GlobalService,
    // private _CartComponent: CartComponent,
    private _HttpClient: HttpClient,
    private _Router: Router
  ) {
    this.baseUrl = this._GlobalService.baseURL;
    this.orderRoute = this._GlobalService.orderRoute;
    this.apiKey = this._GlobalService.apiKey;
  };

  addOrder(Address:any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.orderRoute}`, {address:Address}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  removeOrder(OrderID:string): Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}${this.orderRoute}/${OrderID}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  getAllOrders(): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.orderRoute}` , {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
      }, withCredentials: true
    })
  }

  getLastOne(): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.orderRoute}?limit=1` , {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
      }, withCredentials: true
    })
  }


  getOrder(OrderID:string): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}${this.orderRoute}/${OrderID}`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
      }, withCredentials: true
    })
  }

  // getOrderPlaced(cart:any){
  //   this._OrderDetailsComponent.tempCart=cart
  // }

}
