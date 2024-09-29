import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotificationComponent } from './core/components/notification/notification.component';
import { NotificationService } from './core/components/notification/services/notification.service';
import { BestSellerComponent } from './features/home/best-seller/best-seller.component';
import { HomeComponent } from './features/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NotificationComponent,
    BestSellerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(HomeComponent) homeComponent!: HomeComponent;

  onCartClicked() {
    this.homeComponent.showSideCart(true);
  }

  title = 'Front';

  constructor(private _NotificationService: NotificationService) { }
}
