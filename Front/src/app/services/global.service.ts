import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  baseURL:string = "http://localhost:3300/";
  authRoute: string = 'api/v1/auth';
  productsRoute: string = 'api/v1/products';
  categoryRoute: string = 'api/v1/categories';
  subcategoryRoute: string = 'api/v1/subcategory';
  userRoute: string = 'api/v1/users';
  orderRoute: string = 'api/v1/orders';
  addressRoute: string = 'api/v1/address';
  reviewsRoute: string = 'api/v1/reviews';
  cartRoute: string = 'api/v1/carts';
  productsImage: string = `${this.baseURL}/images/products/`;
  usersImage: string = `${this.baseURL}/images/users/`;
  apiKey: string = 'secret123';
  constructor(private _HttpClient:HttpClient) { }



  fetchCities(): Observable<any> {
    return this._HttpClient.get(`https://rawcdn.githack.com/kamikazechaser/administrative-divisions-db/master/api/EG.json`);
  }

  get(endpoint: string, ...params: string[]): Observable<any> {
    const tempString: string = params.join('/');
    const fullUrl = `${endpoint}/${tempString}`;
    console.log(tempString);
    return this._HttpClient.get(fullUrl);
  }

}
