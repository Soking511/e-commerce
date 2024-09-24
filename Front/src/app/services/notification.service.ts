import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  notificationEvent = new EventEmitter<{ message: string, type: string }>();

  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {}

  showNotification(message: string, type: string = 'info') {
    this.notificationEvent.emit({ message, type });
  }
}
