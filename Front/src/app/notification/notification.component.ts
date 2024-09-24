import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NgClass, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports:[NgClass, NgSwitchCase, NgSwitchDefault, NgSwitch, NgFor],
})
export class NotificationComponent implements OnInit {
  message: string[][] = [];
  show: boolean = false;
  toast: string = '';
  timer: any;

  constructor(private _NotificationService: NotificationService) {}

  ngOnInit(): void {
    this._NotificationService.notificationEvent.subscribe(({ message, type }) => {
      this.showNotification(message, type);
    });
  }

  showNotification(message: string, toast: string) {
    this.message.push([message, toast]);
    this.toast = toast;
    setTimeout(() => {
      this.show = true;
    }, 2000);
    if (this.timer) clearTimeout(this.timer);


    this.removeNotifications();
  }

  removeNotifications() {
    if (this.message.length === 0) {
      this.show = false;
      return;
    }

    this.timer = setTimeout(() => {
      this.message.shift();
      this.show = this.message.length > 0;
      this.removeNotifications();
    }, 2000 - ( this.message.length * 100 ));
  }
}
