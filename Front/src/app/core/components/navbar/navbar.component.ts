import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from "../../../features/home/home.component";
import { SideCartService } from '../../../shared/services/side-cart.service';
import { NgClass, NgIf } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, HomeComponent, NgIf, ButtonModule, MenubarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    ButtonModule,InputTextModule,
    NgClass,
    DropdownModule,
    MenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: 'home',
    },
    {
      label: 'Collections',
      icon: 'pi pi-fw pi-th-large',
      routerLink: '#',
    },
    {
      label: 'Contact Us',
      icon: 'pi pi-fw pi-envelope',
      routerLink: '#',
    },
  ];

  userMenu: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.logout(),
    },
  ];



  selectedUser: MenuItem | null = null;
  isNavbarOpen: boolean = false;
  onUserMenuChange(event: any) {
    if (event.value) {
      event.value.command();
    }
    this.selectedUser = null; // Reset selection
  }

  navigateTo(page: string) {
    console.log(`Navigating to ${page}`);
    // Add your navigation logic here
  }

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
    this.cartClicked.emit();
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
