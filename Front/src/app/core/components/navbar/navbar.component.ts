import { Component, Output, EventEmitter, Input } from '@angular/core';  // Correct EventEmitter import
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from "../../../features/home/home.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin: boolean = false;
  sideCart: boolean = false;
  @Output() cartClicked = new EventEmitter<void>();

  constructor(private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      next: () => {
        this.isLogin = (this._AuthService.currentUser.getValue() !== null) ? true : false;
      }
    })
  }

  logout() {
    this._AuthService.logout();
  }

  onCartClick() {
    this.cartClicked.emit();  // Emit the event when cart is clicked
  }
}
