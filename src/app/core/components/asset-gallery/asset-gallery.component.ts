import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import * as PhotoSwipe from 'photoswipe';
// import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
// import 'photoswipe/style.css';

import { AssetFragment } from '../../../common/generated-types';

export type AssetWithDimensions = Pick<AssetFragment, 'id' | 'preview' | 'width' | 'height'>;

@Component({
    selector: 'vsf-asset-gallery',
    templateUrl: './asset-gallery.component.html',
    styleUrls: ['./asset-gallery.component.scss'],
})
export class AssetGalleryComponent implements OnInit, AfterViewInit {
    @Input() assets: AssetWithDimensions[] = [];
    @Input() selectedAssetId: string;
    @ViewChild('mainPreview', {static: false})
    private mainPreview: ElementRef<HTMLImageElement>;

    selectedAsset?: AssetWithDimensions;
    private gallery: any;

    @ViewChild('photoswipeModal', {static: true}) modal: ElementRef<HTMLDivElement>;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.selectImage(this.selectedAssetId);
    }

    ngAfterViewInit() {
        const items = this.assets.map(asset => ({
            src: asset.preview,
            msrc: asset.preview + '?preset=medium',
            width: asset.width || 1000,
            height: asset.height || 1000,
        }));
        this.gallery = new PhotoSwipeLightbox({
            dataSource: items,
            pswpModule: () => import('photoswipe'),
            showHideOpacity: true,
        });
        this.gallery.init();
        console.log(this.gallery);
    }

    selectImage(assetId: string) {
        if (assetId != null) {
            this.selectedAsset = this.assets.find(a => a.id === assetId);
        } else {
            this.selectedAsset = this.assets[0];
        }
    }

    openImage(assetId: string) {
        const index = this.assets.findIndex(a => a.id === assetId);
        this.gallery.loadAndOpen(index);
    }

}
