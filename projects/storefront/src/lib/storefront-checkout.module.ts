import { NgModule } from '@angular/core';

import { CheckoutConfirmationComponent } from './components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutSignInComponent } from './components/checkout-sign-in/checkout-sign-in.component';
import { StorefrontSharedModule } from './storefront-shared.module';

const DECLARATIONS = [
    CheckoutConfirmationComponent,
    CheckoutPaymentComponent,
    CheckoutShippingComponent,
    CheckoutSignInComponent,
];

@NgModule({
    imports: [StorefrontSharedModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class StorefrontCheckoutModule { }
