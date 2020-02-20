import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'vsf-layout-header',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
}
