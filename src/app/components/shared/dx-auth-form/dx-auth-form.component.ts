import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-dx-auth-form',
  templateUrl: './dx-auth-form.component.html',
  styleUrls: ['./dx-auth-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxAuthFormComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showLogo: boolean = true;
}
