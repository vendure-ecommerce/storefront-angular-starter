import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vsf-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
