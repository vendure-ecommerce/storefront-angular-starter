import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { race, timer } from 'rxjs';
import { finalize, mapTo, take } from 'rxjs/operators';

import { NotificationComponent } from '../../components/notification/notification.component';

import { NOTIFICATION_OPTIONS, NotificationOptions } from './notification-types';

/**
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private overlay: Overlay, private injector: Injector) {
    }

    /**
     * Display a "toast" notification.
     */
    notify(options: NotificationOptions) {
        const positionStrategy = this.overlay.position().global().top('16px').right('16px');
        const scrollStrategy = this.overlay.scrollStrategies.noop();
        const overlayRef = this.overlay.create(new OverlayConfig({
            scrollStrategy,
            positionStrategy,
            hasBackdrop: false,
        }));

        const portal = new ComponentPortal(NotificationComponent, null, this.createInjector(options));
        const notificationRef = overlayRef.attach(portal);

        const backdropClick$ = overlayRef.backdropClick().pipe(mapTo(undefined));
        return race<any>(
            notificationRef.instance.close,
            timer(options.duration),
        ).pipe(
            take(1),
            finalize(() => overlayRef.dispose()),
        );
    }

    error(message: string) {
        return this.notify({
            title: 'An error occurred',
            message,
            duration: 10000,
            type: 'error',
        });
    }

    success(message: string) {
        return this.notify({
            title: 'Success',
            message,
            duration: 5000,
            type: 'error',
        });
    }

    info(message: string) {
        return this.notify({
            title: 'Information',
            message,
            duration: 5000,
            type: 'info',
        });
    }

    private createInjector(options: NotificationOptions): PortalInjector {
        const weakMap = new WeakMap<any, any>([
            [NOTIFICATION_OPTIONS, options],
        ]);
        return new PortalInjector(this.injector, weakMap);
    }
}
