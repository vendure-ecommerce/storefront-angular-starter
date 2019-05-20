import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import Drift from 'drift-zoom';

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
    private driftInstance: Drift;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        const containerEl = this.container || null;
        this.driftInstance = new Drift(this.elementRef.nativeElement, {
            namespace: 'vsf-zoom',
            inlinePane: !containerEl || 768,
            inlineOffsetY: -85,
            hoverDelay: 500,
            paneContainer: containerEl,
            containInline: true,
            hoverBoundingBox: true,
            touchBoundingBox: false,
        });
    }

    ngOnDestroy(): void {
        if (this.driftInstance) {
            this.driftInstance.destroy();
        }
    }

}
