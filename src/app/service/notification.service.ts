import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);

  getNotifications() {
    return this.notifications$.asObservable();
  }

  show(type: 'success' | 'error' | 'info', message: string) {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message
    };

    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.remove(notification.id);
    }, 5000);
  }

  remove(id: string) {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter(n => n.id !== id));
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  info(message: string) {
    this.show('info', message);
  }
}