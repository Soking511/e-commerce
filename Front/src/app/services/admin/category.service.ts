import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie'
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private baseUrl: string = '';
  private categoryRoute: string = '';
  private apiKey: string = ``

  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseURL;
    this.categoryRoute = this._GlobalService.categoryRoute;
    this.apiKey = this._GlobalService.apiKey;
  }

  getAllCategories(limit: number = 50, page: number = 1, sort:string='name', search:string=''): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.categoryRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  getCategoryByID(CategoryID:string): Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}${this.categoryRoute}/${CategoryID}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  createCategory(formData:any): Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}${this.categoryRoute}`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  deleteCategory(CategoryID:string): Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}${this.categoryRoute}/${CategoryID}`,{
      headers:{
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  updateCategory(CategoriyID:string, formData:any): Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}${this.categoryRoute}/${CategoriyID}`, formData, {
      headers:{
        authorization: `Bearer ${localStorage.getItem(`user`)}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

}
