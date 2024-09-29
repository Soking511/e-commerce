import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { Users } from '../../shared/interfaces/uesrs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userImage: any;
  uploadImage: any;

  updateForm: FormGroup;

  constructor(private _AuthService: AuthService, private _ApiService: ApiService) {
    this.updateForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  setUserImage(event: any) {
    const images = event.target.files;
    if (images) {
      this.uploadImage = images[0];
    }
  }

  getCurrentUserInfo() {
    this._ApiService.get<Users>('users/me', undefined, 'user').subscribe({
      next: (res) => {
        this.currentUser = res.data;
        this.updateForm.patchValue({
          name: this.currentUser.name,
          phone: this.currentUser.phone,
        });
        console.log(this.currentUser);
        console.log( 'f', this.userImage+this.currentUser.image);
      },
      error: (err) => { }
    });
  }

  updateUser() {
    const formData = new FormData();
    if (this.uploadImage) { formData.append('image', this.uploadImage); }

    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('phone', this.updateForm.get('phone')?.value);

    this._ApiService.update('users', formData, this.currentUser._id).subscribe({
      next: (res) => {},
      error: (err) => {}
    });
  }

  ngOnInit(): void {
    this.getCurrentUserInfo();
    this.userImage = this._AuthService.usersImage;
    console.log(this.userImage+this.currentUser.image);
  }
}
