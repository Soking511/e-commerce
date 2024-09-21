import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private baseUrl: string = '';
  private subcategoryRoute: string = '';
  apiKey: string = ``
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseURL;
    this.subcategoryRoute = this._GlobalService.subcategoryRoute;
    this.apiKey = this._GlobalService.apiKey;
  }

  getAllSubcategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.subcategoryRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`
      },
      withCredentials: true
    })
  }
}