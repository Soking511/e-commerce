import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Categories, Category } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit {
  page:number = 1;
  limit:number = 50;
  Categories:any[] = [];
  Pagination = {};
  search: string ='';
  sort='name';


  constructor( private _AuthService: AuthService, private _ApiService:ApiService){

  }

  getAllCategories(limit: number = 50, page: number = 1, sort:string='name', search:string=''){
    this._ApiService.get('categories', limit).subscribe({
      next:(res) => {
        this.Categories = res.data as Category[];
        console.log(this.Categories);
      },
      // error:(err) => { }
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
}
