import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'vsf-checkout-stage-indicator',
    templateUrl: './checkout-stage-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutStageIndicatorComponent  {
    @Input() signedIn = false;
    @Input() activeStage = 1;
}
