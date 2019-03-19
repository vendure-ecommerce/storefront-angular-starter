import { Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter, take } from 'rxjs/operators';

import { DropdownTriggerDirective } from './dropdown-trigger.directive';

/**
 * A generic dropdown component.
 *
 * @example
 * ```
 * <vsf-dropdown #dropdown [position]="'top'">
 *
 *     <button vsfDropdownTrigger class="btn btn-secondary">Open it!</button>
 *
 *     <div class="card" vsfDropdownContent>
 *         <p>Here's the dropdown content!</p>
 *         <button class="btn" (click)="dropdown.close()">Close</button>
 *     </div>
 *
 * </vsf-dropdown>
 * ```
 */
@Component({
    selector: 'vsf-dropdown',
    templateUrl: './dropdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
    /** If true, the dropdown will close when the user clicks anywhere on the document */
    @Input() closeOnDocumentClick = true;
    /** If true, the dropdown will open when the trigger element is hovered with the mouse */
    @Input() openOnHover = false;
    /** Sets the preferred position of the dropdown. Actual position depends on available space */
    @Input() position: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    @ContentChild(DropdownTriggerDirective, { read: ElementRef }) trigger: ElementRef;
    @ViewChild('contentTemplate', { read: TemplateRef }) contentTemplate: TemplateRef<any>;
    @ViewChild('contentElement', { read: ElementRef }) contentElement: ElementRef<any>;
    private closeFn: (() => any) | null = null;
    private clickSubscriber: Subscription;
    private mouseoverSubscriber: Subscription;

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef) { }

    onTriggerClick() {
        this.open();
    }

    onTriggerMouseEnter() {
        if (this.openOnHover && this.closeFn == null) {
            this.open();
        }
    }

    onTriggerMouseLeave() {
        if (this.openOnHover) {
            // this.close();
        }
    }

    /**
     * Stop the click event bubbling up from the dropdown content so as not to cause it to close.
     */
    stopEventPropagation(e: MouseEvent) {
        e.stopPropagation();
    }

    open() {
        this.close();
        const positionStrategy = this.getPositionStrategy();
        const scrollStrategy = this.overlay.scrollStrategies.block();
        const overlayRef = this.overlay.create(new OverlayConfig({
            scrollStrategy,
            positionStrategy,
        }));
        this.closeFn = () => {
            overlayRef.dispose();
            this.closeFn = null;
        };
        const dropdown = overlayRef.attach(new TemplatePortal(this.contentTemplate, this.viewContainerRef));

        if (this.closeOnDocumentClick) {
            this.registerClickSubscriber();
        }
        if (this.openOnHover) {
            this.registerMouseoverSubscriber();
        }
    }

    close() {
        if (typeof this.closeFn === 'function') {
            this.closeFn();
        }
        if (this.clickSubscriber) {
            this.clickSubscriber.unsubscribe();
        }
        if (this.mouseoverSubscriber) {
            this.mouseoverSubscriber.unsubscribe();
        }
    }

    private registerClickSubscriber() {
        this.clickSubscriber = fromEvent<MouseEvent>(document, 'click')
            .pipe(
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return clickTarget !== this.trigger.nativeElement;
                }),
                take(1),
            ).subscribe(() => {
                this.close();
            });
    }

    private registerMouseoverSubscriber() {
        this.mouseoverSubscriber = fromEvent<MouseEvent>(document, 'mouseover')
            .pipe(
                debounceTime(200),
                filter(e => {
                    return !this.contentElement.nativeElement.contains(e.target) &&
                        !this.trigger.nativeElement.contains(e.target);
                }),
                take(1),
            ).subscribe((e) => {
                console.log((e.target as any).tagName);
                this.close();
            });
    }

    private getPositionStrategy(): PositionStrategy {
        const position = {
            top: {
                originX : 'center',
                originY : 'top',
                overlayX: 'center',
                overlayY: 'bottom',
            },
            right: {
                originX : 'end',
                originY : 'center',
                overlayX: 'start',
                overlayY: 'center',
            },
            bottom: {
                originX : 'center',
                originY : 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
            left: {
                originX : 'start',
                originY : 'center',
                overlayX: 'end',
                overlayY: 'center',
            },
        };

        return this.overlay.position().flexibleConnectedTo(this.trigger)
            .withPositions([position[this.position], ...Object.values(position)] as any[])
            .withPush(false);
    }
}
