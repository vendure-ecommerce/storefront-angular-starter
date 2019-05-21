// tslint:disable-next-line:no-reference
/// <reference path="../../types/typings.d.ts" />
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostBinding, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

declare const require: any;

/**
 * This directive makes an image element zoomable on mouse hover. It uses the
 * [Drift](https://github.com/imgix/drift) library.
 */
@Directive({
    selector: '[vsfImageZoom]',
})
export class ImageZoomDirective implements OnInit, OnDestroy {
    @Input('vsfImageZoom') sourceUrl: string;
    @Input('vsfImageZoomContainer') container: HTMLElement;
    @HostBinding('attr.data-zoom') get sourceAttr(): string {
        return this.sourceUrl;
    }
    private driftInstance: import ('drift-zoom');

    constructor(private elementRef: ElementRef,
                @Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const module = require('drift-zoom');
            const containerEl = this.container || null;
            this.driftInstance = new module.default(this.elementRef.nativeElement, {
                namespace: 'vsf-zoom',
                inlinePane: !containerEl || 768,
                inlineOffsetY: -85,
                hoverDelay: 250,
                paneContainer: containerEl,
                containInline: true,
                hoverBoundingBox: true,
                touchBoundingBox: false,
            });
        }
    }

    ngOnDestroy(): void {
        if (this.driftInstance) {
            this.driftInstance.destroy();
            this.driftInstance.trigger.boundingBox.hide();
        }
    }

}
