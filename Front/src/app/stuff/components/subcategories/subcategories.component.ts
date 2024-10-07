import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/components/notification/services/notification.service';
import { ApiService } from '../../../core/services/api.service';
import { NgIf, NgClass, CommonModule } from '@angular/common';
import { Pagination } from '../../../shared/interfaces/pagination';
import { Subcategories } from '../../../shared/interfaces/subcategories';
import { Categories, Category } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})


export class SubcategoriesComponent implements OnInit {
  subcategories: Subcategories[] = [];
  categories: Categories[] = [];
  editSubcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    cover: new FormControl(null),
    category: new FormControl(null, [Validators.required])
  })
  addSubCategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    cover: new FormControl(null),
    category: new FormControl(null, [Validators.required])
  })
  selectSubcategory: any;
  editorForm:boolean = false;
  submitForm:boolean = false;
  uploadImage: File | null = null;
  pagination: Pagination = {};
  limit: number = 10;
  page: number = 1;
  sort='-name'
  selectedCategory=''

  constructor( private _ApiService:ApiService, private _NotificationService:NotificationService ){}

  selectCategory( category:any ){
    this.selectedCategory = category;
  }
  populateForm(subcategory: any) {
    this.editSubcategoryForm.patchValue({
      // category: this.selectedCategory,
    });
    this.addSubCategoryForm.patchValue({
      // category: subcategory.name,
    });
  }

  selectedSubcategory( subcategory: Subcategories ){
    this.selectSubcategory = subcategory == this.selectSubcategory? null:subcategory;
    this.populateForm(subcategory);

  }

  setSubcategoryImage(event: any) {
    const images = event.target.files;
    if (images.length) {
      this.uploadImage = images[0];
    }
  }

  changePage(page:number){
    this.page = page;
    this.getSubcategories();
  }

  getSubcategories(){
    this._ApiService.get<Subcategories[]>('subcategory', this.limit, undefined, `&page=${this.page}&sort=${this.sort}&search=${''}`).subscribe({
      next: (res) => {
        this.subcategories = res.data as unknown as Subcategories[];
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  getCategories(){
    this._ApiService.get<Categories[]>('categories', 50).subscribe({
      next: (res) => {
        this.categories = res.data as unknown as Categories[];
      },
      error: (err) => { }
    })
  }

  delete(subcategory:Subcategories){
    this._ApiService.delete('subcategory', subcategory._id).subscribe({
    next: (res) => {
      this.getSubcategories();
      this._NotificationService.showNotification( `subcategory: ${subcategory.name} [Deleted]`)
    },
      error: (err) => { }
    })
  }

  updateSubcategory(form:FormGroup){
    const formData = new FormData();

    Object.keys(form.value).forEach(key => {
      formData.append(key, form.get(key)?.value);
    });

    if (this.uploadImage) formData.append('cover', this.uploadImage);
    this._ApiService.update<Subcategories[]>('subcategory', formData, this.selectSubcategory._id).subscribe({
      next:(res) => {
        this.editorForm = false;
        this.selectSubcategory = null;
        this._NotificationService.showNotification('Updated subcategory', 'success' );
        this.getSubcategories();
      },
      error:(err) => { }
    })
  }

  addSubcategory(form:FormGroup){
    const formData = new FormData();

    Object.keys(form.value).forEach(key => {
      formData.append(key, form.get(key)?.value);
    });

    if (this.uploadImage) formData.append('cover', this.uploadImage);
    this._ApiService.post<Subcategories[]>('subcategory', formData).subscribe({
      next:(res) => {
        this.submitForm = false;
        this.getSubcategories();
        this._NotificationService.showNotification('Created subcategory', 'success' );
      },
      // error:(err) => { this._NotificationService.showNotification(err.error.errors[0].msg, 'error') }
    })
  }

  showEditor(bool:boolean){
    if ( bool ) this.getCategories();
    if ( !this.selectSubcategory &&  bool ){
      this._NotificationService.showNotification('Select subcategory To Update !!', 'error')
    } else
    if (  this.selectSubcategory.role != 'manager'){
      this.editorForm = bool;
    } else
    this._NotificationService.showNotification(`You Can't Update Manager Account`, 'error');
  }

  showFieldAdd(bool:boolean){
    if ( bool ) this.getCategories();
    this.submitForm = bool;
  }

  filter(s:any){

  }

  ngOnInit(): void {
    this.getSubcategories();
  }
}