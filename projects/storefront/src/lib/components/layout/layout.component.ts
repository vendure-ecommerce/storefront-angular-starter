import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'vsf-layout',
    templateUrl: './layout.component.html',
    // // styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
