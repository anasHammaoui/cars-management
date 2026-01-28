import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NotificationService, Notification } from '../../../service/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styles: [`
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `]
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.getNotifications();
  }

  ngOnInit() {}

  getNotificationClass(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-900 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-900 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      default:
        return 'bg-card text-foreground border-border';
    }
  }

  remove(id: string) {
    this.notificationService.remove(id);
  }
}