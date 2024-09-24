import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  baseURL:string = "http://localhost:3300/";
  authRoute: string = 'api/v1/auth';
  productsRoute: string = 'api/v1/products';
  categoryRoute: string = 'api/v1/categories';
  subcategoryRoute: string = 'api/v1/subcategory';
  reviewsRoute: string = 'api/v1/reviews';
  cartRoute: string = 'api/v1/carts';
  productsImage: string = `${this.baseURL}/images/products/`;
  usersImage: string = `${this.baseURL}/images/users/`;
  apiKey: string = 'secret123';
  constructor() { }
}
