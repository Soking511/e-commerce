import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/admin/category.service';

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


  constructor( private _AuthService: AuthService, private _CategoryService:CategoryService){

  }

  getAllCategories(limit: number = 50, page: number = 1, sort:string='name', search:string=''){
    this._CategoryService.getAllCategories(limit, page, sort, search).subscribe({
      next:(res) => {
        this.Categories = res.data
        console.log(this.Categories);
      },
      // error:(err) => { }
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }
}
