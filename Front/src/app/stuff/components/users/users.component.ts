import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Users } from '../../../shared/interfaces/uesrs';
import { NgClass, NgIf } from '@angular/common';
import { NotificationService } from '../../../core/components/notification/services/notification.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  Users: Users[] = [];
  selectUser: any;

  constructor( private _ApiService:ApiService, private _NotificationService:NotificationService ){}

  selectedUser( user: Users ){
    this.selectUser = user == this.selectUser? null:user;
  }

  getUsers(){
    this._ApiService.get<Users>('users', undefined, 'manager').subscribe({
      next: (res) => { this.Users = res.data as Users[]; console.log(this.Users);},
      error: (err) => { }
    })
  }

  delete(user:Users){
    if ( user.role != 'manager' ){
      this._ApiService.delete('users', user._id).subscribe({
        next: (res) => {
          this.getUsers();
          this._NotificationService.showNotification( `User: ${user.name} [Deleted]`)
        },
        error: (err) => { }
      })
    } else
    this._NotificationService.showNotification(`You Can't Delete Manager Account`, 'error');
  }

  filter(s:any){

  }
  
  ngOnInit(): void {
    this.getUsers();
  }
}
