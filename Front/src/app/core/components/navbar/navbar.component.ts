import { Component, Output, EventEmitter, Input } from '@angular/core';  // Correct EventEmitter import
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from "../../../features/home/home.component";
import { NgModel } from '@angular/forms';
import { SideCartService } from '../../../shared/services/side-cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin: boolean = false;
  @Output() cartClicked = new EventEmitter<void>();

  constructor(private sideCartService: SideCartService, private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      next: () => {
        this.isLogin = (this._AuthService.currentUser.getValue() !== null) ? true : false;
      }
    })
  }

  onCartClick() {
    this.cartClicked.emit(); // Emit the event to toggle the cart
  }

  logout() {
    this._AuthService.logout();
  }

}
