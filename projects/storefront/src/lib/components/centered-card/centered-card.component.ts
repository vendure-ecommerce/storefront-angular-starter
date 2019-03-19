import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vsf-centered-card',
  templateUrl: './centered-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenteredCardComponent {
    @Input() title: string;
    @Input() subTitle: string;
}
