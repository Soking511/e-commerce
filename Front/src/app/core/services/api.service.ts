import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import Cookies from 'js-cookie';
import { ApiResponse } from './interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseURL=''; version=''; apiKey='';

  constructor( private _GlobalService:GlobalService, private _AuthService:AuthService, private _Http:HttpClient ) {
    this.baseURL = _GlobalService.baseURL;
    this.version = _GlobalService.version;
    this.apiKey = _GlobalService.apiKey;
  }

  get<Interface>(route: string, quantity?:number, role?:string, query?:string) {
    if (role) this._AuthService.checkToken();

    const headers: { [key: string]: string } = {
      "X-API-KEY": this.apiKey,
    };

    if (role) headers['authorization'] = `Bearer ${localStorage.getItem('user')}`;

    return this._Http.get<ApiResponse<Interface>>(`${this.baseURL}${this.version}/${route}${quantity?'?limit='+quantity:''}${(quantity||!query)?'':'?'}${query||''}`, {
      headers,
      withCredentials: true,
    });
  }

  fetch<Interface>(route: string) {
    return this._Http.get<ApiResponse<Interface>>(route);
  }
  
  update<Interface>(route: string, data:any, id?:string) {
    this._AuthService.checkToken();

    return this._Http.put<ApiResponse<Interface>>(`${this.baseURL}${this.version}/${route}${id?`/${id}` : ''}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  post<Interface>(route: string, data:any, id:string='') {
    this._AuthService.checkToken();
    console.log(data);
    return this._Http.post<ApiResponse<Interface>>(`${this.baseURL}${this.version}/${route}${id?`/${id}` : ''}`, data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

  delete(route: string, id?:string) {
    this._AuthService.checkToken();

    return this._Http.delete(`${this.baseURL}${this.version}/${route}${id?`/${id}` : ''}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      }, withCredentials: true
    })
  }

}
