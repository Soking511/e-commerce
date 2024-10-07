import { Component, Output, EventEmitter, OnInit } from '@angular/core';  // Correct EventEmitter import
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from "../../../features/home/home.component";
import { SideCartService } from '../../../shared/services/side-cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isDropdownOpen: boolean = false;
  itemsQuantity: number = 0;
  @Output() cartClicked = new EventEmitter<void>();

  constructor(private _sideCartService: SideCartService, private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      next: () => {
        this.isLogin = (this._AuthService.currentUser.getValue() !== null) ? true : false;
      }
    })
  }

  onCartClick() {
    this.cartClicked.emit(); // Emit the event to toggle the cart
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this._AuthService.logout();
    this.isDropdownOpen=false;
  }

  ngOnInit(): void {
    this._sideCartService.cartItems$.subscribe(items => {
      this.itemsQuantity = 0;
      for ( let i = 0; i < items.length; i++ ){
        this.itemsQuantity++;
      }

    });
  }
}
