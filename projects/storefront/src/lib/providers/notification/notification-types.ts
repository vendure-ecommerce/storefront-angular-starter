import { InjectionToken } from '@angular/core';

export type NotificationType = 'error' | 'success' | 'info';

export interface NotificationOptions {
    type: NotificationType;
    title: string;
    message: string;
    duration: number;
}

export const NOTIFICATION_OPTIONS = new InjectionToken<NotificationOptions>('NOTIFICATION_OPTIONS');
