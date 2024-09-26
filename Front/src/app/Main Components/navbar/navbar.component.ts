import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      next: () => {
        this.isLogin = (this._AuthService.currentUser.getValue() !== null)? true: false;
      }
    })
  }

  logout() {
    this._AuthService.logout();
  }

}