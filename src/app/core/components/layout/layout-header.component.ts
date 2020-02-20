import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    OnDestroy,
    Optional,
    ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { bufferTime, filter, map } from 'rxjs/operators';

@Component({
    selector: 'vsf-layout-header',
    template: `<div class="floating-container" #floatingContainer><ng-content></ng-content></div>`,
    styleUrls: ['./layout-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent implements AfterViewInit, OnDestroy {

    @HostBinding('class.floating')
    floating = false;

    @HostBinding('style.height.px')
    headerHeight: number | null;

    @ViewChild('floatingContainer', { static: true })
    private floatingContainer: ElementRef<HTMLDivElement>;

    private subscription: Subscription;

    constructor(@Optional() @Inject(DOCUMENT) private document: Document) {}

    ngAfterViewInit() {
        const window = document.defaultView;
        if (this.document) {
            this.setUpScrollHandler();
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private setUpScrollHandler() {
        this.subscription = fromEvent(window, 'scroll').pipe(
            map(() => window.scrollY),
            bufferTime(250),
            filter(val => 1 < val.length),
            map(val => val[val.length - 1] - val[0]),
        ).subscribe((val) => {
            if (window.scrollY === 0) {
                this.setFloating(false);
            } else if (0 < val) {
                this.setFloating(false);
            } else if (val < -50 && 300 < window.scrollY) {
                this.setFloating(true);
            }
        });
    }

    private setFloating(isFloating: boolean) {
        this.floating = isFloating;
        this.headerHeight = this.floatingContainer.nativeElement.offsetHeight;
    }
}
