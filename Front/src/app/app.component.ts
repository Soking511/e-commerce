import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { BestSellerComponent } from './features/home/best-seller/best-seller.component';
import { HomeComponent } from './features/home/home.component';
// import { SideCartService } from './shared/services/side-cart.service';
import { CartComponent } from "./features/cart/cart.component";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BestSellerComponent,
    CartComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor( private primengConfig: PrimeNGConfig) {

  }

  onCartClicked() {
    // this._sideCartService.toggleSideCart();
  }
}

