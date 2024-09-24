import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import cookies from 'js-cookie'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private baseUrl: string = '';
  private categoryRoute: string = '';
  apiKey: string = ``
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseURL;
    this.categoryRoute = this._GlobalService.categoryRoute;
    this.apiKey = this._GlobalService.apiKey;
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.categoryRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`
      },
      withCredentials: true
    })
  }
}