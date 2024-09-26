import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from "./Main Components/navbar/navbar.component";
import { FooterComponent } from "./Main Components/footer/footer.component";
import { NotificationComponent } from './Main Components/notification/notification.component';
import { BestSellerComponent } from "./best-seller/best-seller.component";
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent, NotificationComponent, BestSellerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Front';

  constructor(private _NotificationService:NotificationService){ }
}
