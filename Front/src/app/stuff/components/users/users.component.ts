import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { NgClass, NgIf } from '@angular/common';
import { NotificationService } from '../../../core/components/notification/services/notification.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pagination } from '../../../shared/interfaces/pagination';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'] // Fix 'styleUrl' to 'styleUrls'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  editUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    active: new FormControl(null, [Validators.required])
  });
  addUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]), // Added email validator
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required])
  });

  selectedUser: any = {}; // Specify type
  isEditing: boolean = false;
  isAdding: boolean = false;
  pagination: Pagination = {};
  limit: number = 10;
  page: number = 1;
  sort = '-name';
  uploadImage: File | null = null; // Specify type

  constructor(private apiService: ApiService, private notificationService: NotificationService) {}

  populateForm(user: any) {
    this.editUserForm.patchValue({
      name: user.name,
      phone: user.phone,
      role: user.role,
      active: user.active
    });
  }

  selectUser(user: any) {
    this.selectedUser = user === this.selectedUser ? null : user;
    if (this.selectedUser) {
      this.populateForm(this.selectedUser);
    }
  }

  getUsers() {
    this.apiService.get<any[]>('users', undefined, 'manager', `&page=${this.page}&sort=${this.sort}&search=`).subscribe({
      next: (res) => {
        this.users = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => {
        this.notificationService.showNotification('Error fetching users', 'error');
      }
    });
  }

  setUserImage(event: any) {
    const images = event.target.files;
    if (images.length) {
      this.uploadImage = images[0];
    }
  }

  delete(user: any) {
    if (user.role !== 'manager') {
      this.apiService.delete('users', user._id).subscribe({
        next: (res) => {
          this.getUsers();
          this.notificationService.showNotification(`User: ${user.name} deleted`, 'success');
        },
        error: (err) => {
          this.notificationService.showNotification('Error deleting user', 'error');
        }
      });
    } else {
      this.notificationService.showNotification("You can't delete the Manager account", 'error');
    }
  }

  changePage(page: number) {
    this.page = page;
    this.getUsers();
  }

  updateUser(form: FormGroup) {
    const formData = new FormData();
    if (this.uploadImage) {
      formData.append('image', this.uploadImage);
    }
    Object.keys(this.editUserForm.controls).forEach(key => {
      formData.append(key, this.editUserForm.get(key)?.value);
    });

    this.apiService.update<any>('users', formData, this.selectedUser!._id).subscribe({
      next: (res) => {
        this.isEditing = false;
        this.selectedUser = null;
        this.notificationService.showNotification('Updated User', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.notificationService.showNotification('Error updating user', 'error');
      }
    });
  }

  addUser(form: FormGroup) {
    const formData = new FormData();
    if (this.uploadImage) {
      formData.append('image', this.uploadImage);
    }
    Object.keys(this.addUserForm.controls).forEach(key => {
      formData.append(key, this.addUserForm.get(key)?.value);
    });
    this.apiService.post<any>('users', formData).subscribe({
      next: (res) => {
        this.isAdding = false;
        this.notificationService.showNotification('Created User', 'success');
        this.getUsers();
      },
      error: (err) => {
        this.notificationService.showNotification(err.error.errors[0]?.msg || 'Error creating user', 'error');
      }
    });
  }

  toggleEditor(bool: boolean) {
    if (!this.selectedUser && bool) {
      this.notificationService.showNotification('Select a user to update!', 'error');
    } else if (this.selectedUser?.role !== 'manager') {
      this.isEditing = bool;
    } else {
      this.notificationService.showNotification("You can't update the Manager account", 'error');
    }
  }

  toggleAddUserForm(bool: boolean) {
    this.isAdding = bool;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
