import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent implements OnInit{
  message: string[][] = [];
  show: boolean = false;
  toast: string = '';
  timer: any;

  showNotification(message: string, toast: string) { // toast: success || error || warning || info
    this.message.push([message, toast]);
    this.toast = toast;
    if (this.timer) {
      clearTimeout(this.timer);
      this.show = true;
    }
    this.removeNotifications();

  }

  removeNotifications() {
    if (this.message.length === 0) {
      this.show = false;
      return;
    }

    this.timer = setTimeout(() => {
      this.message.pop();
      this.removeNotifications();
    }, 2000);
  }

  ngOnInit(): void {
    // for( let i = 0; i < 5; i++) {
    //   setTimeout(() => {
    //     this.showNotification("Welcome Back ..", "info");
    //   }, 2000 * i + 1);
    // }
  }

}

